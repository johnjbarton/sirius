// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

/*global define console window */


define(['appendFrame', 'crx2app/appEnd/proxyChromePipe', 'crx2app/rpc/ChromeProxy'], 
function(appendFrame,              chromeExtensionPipe,               ChromeProxy)  {

  var debug = true;

  function showInspectorIframe() {
    var inspectorElt = window.document.getElementById('WebInspector');
    inspectorElt.classList.remove('hide');
    return appendFrame('WebInspector', "inspector/front-end/devtools.html");
  }

// TODO put this into a .js file loaded statically by override

  // Base URL for crx2app

  // stand alone crx2app
  // var iframeDomain ="chrome-extension://bbjpappmojnmallpnfgfkjmjnhhplgog";
  // Sirius crx2app
  var iframeDomain = window.crx2appBase;

  var connection = chromeExtensionPipe.createFrom(iframeDomain);

  window.beforeUnloadQueue = [];

  window.onbeforeunload = function runQueue() {
    window.beforeUnloadQueue.forEach(function(fnc) {
      fnc();
    });
  };

  window.beforeUnloadQueue.push(function detach() {
    connection.detach();
  });

  function openNewTabId(chromeProxy, url, onNewTabId) {
    chromeProxy.openNewWindow( function(win) {
      var tabId = win.tabs[0].id;
      if (debug) {
        console.log('atopwi openNewTabId '+tabId);
      }
      onNewTabId(tabId);
    });
  }
 
 
 
  function Debuggee(chromeProxy, debuggeeSpec) {
    this.chrome = chromeProxy;
  }
  
  Debuggee.prototype = {
    
    parseDebuggee: function(debuggeeSpec) {
      var tabId = parseInt(debuggeeSpec.tabId, 10);
      if ( isNaN(tabId) ) {  // then we better have a URL
        this.url = decodeURIComponent(debuggeeSpec.url);
      } else {
        this.tabId = tabId;
      }
    },
    
    open: function(debuggeeSpec) {
      this.parseDebuggee(debuggeeSpec);
      openNewTabId(
        this.chrome,
        this.url, 
        function(newTabId) {
          this.tabId = newTabId;
          window.beforeUnloadQueue.push(function() {
            this.chrome.tabs.remove(newTabId, function() {
              if (debug) {
                console.log('atopwi removed '+newTabId);
              }
            });
          }.bind(this));
          this.attach();
        }.bind(this)
      );
    },
    
    attach: function() {
      this.chrome.debugger.attach(
        {tabId: this.tabId}, 
        '1.0', 
        this.onAttach.bind(this)
      );
    },
    
    onAttach: function() {
      if (debug) {
        console.log('atopwi chrome.debugger.attach complete '+this.tabId);
      }
       
      window.beforeUnloadQueue.unshift(function() {
          this.chrome.debugger.detach({tabId: this.tabId}, function() {
            if (debug) {
              console.log('atopwi detached from ' + this.tabId);
            }
          });
        }.bind(this));
            
      this.openInspector();
    },
    
    openInspector: function() {
      var inspectorElt = showInspectorIframe();
      this.inspectorWindow = inspectorElt.contentWindow;
  
      // Capture the DOMContentLoaded to monkey-patch inspectorWindow.
      //
      this.inspectorWindow.addEventListener(
        'DOMContentLoaded', 
        this.patchInspector.bind(this)
      );
    },
    
    patchInspector: function(event) {
      if (debug) {
        console.log("DOMContentLoaded on inspectorWindow ", this);
      }

      var backend = this.inspectorWindow.InspectorBackend;
      backend.sendMessageObjectToBackend = this.sendMessageObject.bind(this);
      
      this.chrome.jsonHandlers['chrome.debugger.remote'] = {
        jsonObjectHandler:  function(data) {
          if (debug) {
            console.log("jsonObjectHandler "+data.method, data);
          }
          backend.dispatch.apply(backend, [data]);
        }
      };
    
      this.inspectorWindow.InspectorFrontendHost.sendMessageToBackend = function() {
        throw new Error("Should not be called");
      };

      var WebInspector = this.inspectorWindow.WebInspector;
      WebInspector.attached = true; // small icons for embed in orion
    
      // Called asynchronously from WebInspector _initializeCapability
      this._doLoadedDoneWithCapabilities = 
        WebInspector._doLoadedDoneWithCapabilities;
    
      WebInspector._doLoadedDoneWithCapabilities = function() {
        var args = Array.prototype.slice.call(arguments, 0);
        this._doLoadedDoneWithCapabilities.apply(WebInspector, args);
      
        this.navigateToURL();
      }.bind(this);
    
      //WebInspector.doLoadedDone();
    },
    
    navigateToURL: function(inspectorReady) {
      if (this.url) { // then we started in a new tab, navigate
        if (debug) {
          console.log('atopwi setting URL:'+this.url);
        }
        this.chrome.tabs.update(
         this.tabId, 
         {url: this.url}, 
         this.onTabUpdate.bind(this)
        );
      }
    },
    
    onTabUpdate: function(tab) {
      if (debug) {
        var msg = 'atopwi.chrome.tabs.update ' + this.tabId;
        msg += ' to ' + this.url;
        console.log(msg);
      }
    },
    
    sendMessageObject: function(messageObject) {
      if (debug) {
        console.log(messageObject.id+" atopwi sendCommand "+messageObject.method);
      }
      this.chrome.debugger.sendCommand(
        {url: this.url, tabId: this.tabId}, 
        messageObject.method, 
        messageObject.params, 
        this.handleCommandResponse.bind(this, messageObject)
      );
    },
     
    handleCommandResponse: function(messageObject, data) {
      data.id = messageObject.id;
      if (debug) {
        var msg = data.id +
           " atopwi response to sendCommand " + messageObject.method;
           var obj = {messageObject: messageObject, data: data};
           console.log(msg, obj);
      }
      this.inspectorWindow.InspectorBackend.dispatch(data); 
    }
};

  function attach(debuggeeSpec) {

    var tid = window.setTimeout(function offerExtension() {
      // TODO
      window.alert('Requires: https://github.com/johnjbarton/crx2app');
    }, 2000);
  
    // listen for a connection.
    connection.attach(function onConnectedToChrome() {
      // we have connected to the extension, so clear the offer
      window.clearTimeout(tid);
      
      var chromeProxy = ChromeProxy.new(connection, {windows: {}, tabs: {}});
      var debuggee = new Debuggee(chromeProxy);   
      debuggee.open(debuggeeSpec);
    
    }, function errback(msg) {
      var div = window.document.querySelector('#error');
      div.innerHTML = msg;
    });
  
    // dynamically load the chromeIframe, it will connect and fire the callback
    // (if we load the iframe statically, 
    // this outer load event will come *after* the iframe load event.)
    appendFrame('loadChromeIframe', iframeDomain + '/appEnd/chromeIframe.html');
  }

  return {
    attach: attach
  };

});