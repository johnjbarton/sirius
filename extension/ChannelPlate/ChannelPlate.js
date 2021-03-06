// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

// ChannelPlate:  a switchplate, covering over API differences in MessageChannel APIs.

var ChannelPlate = (function channelPlateModule() {

// ----------------------------------------------------------------------------
// Utilities

function assertFunction(onmessage) {
  if (!onmessage || ! typeof onmessage === 'function' ) {
    throw new Error("onmessage argument must be a function");
  }
}

function getWebOrigin(href) {
  // ftp://ftp.rfc-editor.org/in-notes/rfc3986.txt Appendix B
  var reURIString = "^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?";
  var reURI = new RegExp(reURIString);

  // The Web Origin Concept RFC 6454
  // 
  var origin = "";
  var m = reURI.exec(href);
  if (m) {
    var scheme = m[2];
    var authority = m[4];
    
    if (scheme) {
      if (scheme === 'file') {
        origin = "null"; 
      } else {
        origin += scheme;
        origin += ":";
        if (authority) {
          origin += "//";
          origin += authority;
        }
      }
    }

  } // else malformed
  
  return origin;
}

function Base(rawPort, onMessage) {
  if (rawPort) {
    this.port = rawPort;
    if (this.port.onMessage) { // chrome extension 
      this.port.onMessage.addListener(onMessage);
    } else {  // W3c
      this.port.onmessage = onMessage;
    }
  }
}

Base.prototype = {

  accept: function(port, onMessage) {
    this.port = port;
    this.port.onMessage.addListener(onMessage);
    this.drainQueue();
  },

  postMessage: function(message) {
    if (this.port) {
      this.port.postMessage(message);
    } else {
      this.queue = this.queue || [];
      this.queue.push(message);
    }
  },

  drainQueue: function() {
    if (this.queue) {
      this.queue.forEach(function(message) {
        this.postMessage(message);
      }.bind(this));
    }
    delete this.queue;
  }
};

//-----------------------------------------------------------------------------
//  Client using eventWindow.postMessaage to send port

function Talker(eventWindow, onMessage) {
  assertFunction(onMessage);
  // http://www.whatwg.org/specs/web-apps/current-work/multipage/web-messaging.html#channel-messaging
  
  // We will be the client and post to the listening parent (server)
  this.channel = new window.MessageChannel();

  // We allow the parent from any origin
  this.targetOrigin = "*";
  
  // One of the ports is kept as the local port
  this.port = this.channel.port1;
  
  // The other port is sent to the remote side
  eventWindow.postMessage('ChannelPlate', this.targetOrigin, [this.channel.port2]);

  // Implicitly start the port
  this.port.onmessage = onMessage;

  window.addEventListener('unload', function onUnload() {
     this.port.close();
   }.bind(this));
}

Talker.prototype = Object.create(Base.prototype);

//-----------------------------------------------------------------------------
//  For communicating from an iframe to its window.parent

function ChildIframe(onMessage) {
  Talker.call(this, window.parent, onMessage);
}

ChildIframe.prototype = Object.create(Talker.prototype);

//-----------------------------------------------------------------------------
//  For communicating from a web page to its content window

function WebPage(onMessage) {
  Talker.call(this, window, onMessage);
}

WebPage.prototype = Object.create(Talker.prototype);

//-----------------------------------------------------------------------------
// web window Server, listening for connection 

function Listener(clientURL, onMessage) {
  assertFunction(onMessage);

  this.targetOrigin = getWebOrigin(clientURL);

  // The instance properties will not be set until we are sent a valid event
  //
  var onChannelPlate = function(event) {

    if (event.data !== 'ChannelPlate') {
      return;
    } 

    // We must be contacted by the childIframe after it has a valid contentWindow.
    if (this.targetOrigin !== event.origin) {
      return;
    }

    this.port = event.ports[0];
    
    this.port.onmessage = onMessage;

    // Send pending messages
    this.drainQueue();
    
    // Once we bind to the child window stop listening for it to connect.
    //
    window.removeEventListener('message', onChannelPlate);
  }.bind(this);

  window.addEventListener('message', onChannelPlate);
}

Listener.prototype = Object.create(Base.prototype);

//-----------------------------------------------------------------------------
// For communicating from a window to an iframe child

function Parent(childIframe, onMessage) {
  Listener.call(this, childIframe.src, onMessage);
}

Parent.prototype = Object.create(Listener.prototype);

//-----------------------------------------------------------------------------
// For background pages listening for 
// foreground pages by name.

function ChromeBackground(waitForName, onMessage) {
  this.becomeListener(waitForName, onMessage);
}

ChromeBackground.prototype = Object.create(Base.prototype);

ChromeBackground.prototype.becomeListener = function(theirName, onMessage) {
  console.log(window.location + " becomeListener for "+theirName);
  function onConnect(port) {
    console.log("onConnect ", port)
    if (port.name === theirName) {
      this.port = port;
      this.port.onMessage.addListener(onMessage);
      this.drainQueue();
    }
  }
  chrome.extension.onConnect.addListener(onConnect.bind(this));
}

//-----------------------------------------------------------------------------
// For foreground pages to contact background pages.
// Note  the name argument on each content script must be unique 

function ContentScriptTalker(myName, onMessage) {
  this.port = chrome.extension.connect({name: myName});
  function onDisconnect(event){
    console.log("ChromeTalker onDisconnect ", event);
     delete this.port;
  }
  this.port.onDisconnect.addListener(onDisconnect.bind(this));
  this.port.onMessage.addListener(onMessage);
}

ContentScriptTalker.prototype = Object.create(ChromeBackground.prototype);


function DevtoolsTalker(onMessage) {
  var name = "devtools-" + chrome.devtools.inspectedWindow.tabId;
  ContentScriptTalker.call(this, name, onMessage);
}

DevtoolsTalker.prototype = Object.create(ContentScriptTalker.prototype);

//-----------------------------------------------------------------------------
// Common functions for proxies

var ProxyBasePrototype = {

  addPort: function(port, connectionId, incomingPorts, outgoingPorts) {
    var onMessage = this.proxyMessage.bind(this, connectionId, outgoingPorts);
    var queueingPort = incomingPorts[connectionId];
    
    if (queueingPort) {
      queueingPort.accept(port, onMessage);
    } else {
      incomingPorts[connectionId] = new Base(port, onMessage);
    }
    
    if (port.onDisconnect) {  // chrome extension
      port.onDisconnect.addListener(function () {
        delete incomingPorts[connectionId];
      }.bind(this));
    }
    
    console.log("connect "+connectionId+" to "+port);
  }, 

  proxyMessage: function(tabId, outgoingPorts, message) {
    var port = outgoingPorts[tabId];
    if (!port) { // no devtools open for the page
      port = outgoingPorts[tabId] = new Base();
    }    
    port.postMessage(message);
    console.log("proxyMessage to %o: %o", port, message);
  },
}

//-----------------------------------------------------------------------------
// Match content-script ports to devtools ports and ferry messages between them.

function ChromeDevtoolsProxy() {
  this.devtoolsPorts = {};
  this.backgroundPorts = {};

  function onConnect(port) {

    if(port.name.indexOf('devtools') === 0) {
      var tabId = port.name.split('-')[1];
      this.addPort(port, tabId, this.devtoolsPorts, this.backgroundPorts);
    } else {
      var tabId = port.sender.tab.id;
      this.addPort(port, tabId, this.backgroundPorts, this.devtoolsPorts);
    }
  }

  chrome.extension.onConnect.addListener(onConnect.bind(this));
}

ChromeDevtoolsProxy.prototype = ProxyBasePrototype;

//-----------------------------------------------------------------------------
// Match webpage ports to content-script ports and ferry messages between them.

function ContentScriptProxy() {
  this.backgroundPorts = {};
  this.webpagePorts = {};

  /// This will be the background page
  var port = chrome.extension.connect({name: 'content-script'});
  this.addPort(port, 'content-script', this.backgroundPorts, this.webpagePorts);

  this.targetOrigin = getWebOrigin(window.location.href);

  // Listen for web page connections
  //
  var onChannelPlate = function(event) {

    if (event.data !== 'ChannelPlate') {
      return;
    } 

    if (this.targetOrigin !== event.origin) {
      return;
    }

    this.addPort(event.ports[0], 'content-script', this.webpagePorts, this.backgroundPorts);
    
    // Once we addPort to the child window stop listening for it to connect.
    //
    window.removeEventListener('message', onChannelPlate);
  }.bind(this);

  window.addEventListener('message', onChannelPlate);

}

ContentScriptProxy.prototype = ProxyBasePrototype;

//-----------------------------------------------------------------------------
//  Ferry messages to window.parent
function IframeProxy() {

}

//-----------------------------------------------------------------------------
// Define our exports

return {
  // Base class for waiting for connection events
  Listener: Listener,  
  // Waits for connection events from iframes
  Parent: Parent,
  // Base class for starting channels
  Talker: Talker,
  // Starts channels to window.parent
  ChildIframe: ChildIframe,
  // Starts channels from web pages to chrome content scripts
  WebPage: WebPage,
  // Waits for connection events from content scripts
  ChromeBackground: ChromeBackground,
  // Starts channels from chrome content scripts to background 
  ContentScriptTalker: ContentScriptTalker,
  // Starts channels from devtools to background
  DevtoolsTalker: DevtoolsTalker,
  // Waits for web page and background then forward between 
  ContentScriptProxy: ContentScriptProxy,
  // Waits for devtools and background then forward between
  ChromeDevtoolsProxy: ChromeDevtoolsProxy,
};

}());
