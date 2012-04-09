// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

/*global define console window */


define(['atopwi/appendFrame', 'crx2app/appEnd/appEnd', 'crx2app/appEnd/proxyChromePipe', 'crx2app/rpc/ChromeProxy'], 
function(       appendFrame,                  appEnd,              chromeExtensionPipe,               ChromeProxy)  {

  var debug = true;

  window.beforeUnloadQueue = [];

  window.onbeforeunload = function runQueue() {
    window.beforeUnloadQueue.forEach(function(fnc) {
      fnc();
    });
  };

  function Debuggee(iframeDomain) {
    this.iframeDomain = iframeDomain;
  }
  
  Debuggee.prototype = {
    attachToParent: function() {
      var connection = new RESTChannel.Connection();
      console.log(window.location + ' talking ');
      this.register(connection);
      RESTChannel.talk(window.parent, connection, function() {
        console.log('Debuggee connected');
      });
    },
    
    options: function() {
      return {
        put: '{url: string || tabId: number}'
      };
    },
        
    put: function (connection, obj) {
      this.attachToChrome(obj);
      return {message:'hey'};
    },
    
    register: function(connection) {
      connection.register(
        'debuggee',
        { options: this.options.bind(this), put: this.put.bind(this) }
      );
    },
  
    attachToChrome: function(debuggeeSpec) {
      
      var connection;
      if (chrome && chrome.extension) { // the we are in a chrome-extension:// 
        connection = getChromeExtensionPipe();
      } else {  // a web page
        connection = chromeExtensionPipe.createFrom(this.iframeDomain);
      }
      
      var tid = window.setTimeout(function offerExtension() {
        // TODO
        window.alert('Requires: https://github.com/johnjbarton/crx2app');
      }, 2000);
  
      // listen for a connection.
      connection.attach(
        function onConnectedToChrome() {
          // we have connected to the extension, so clear the offer
          window.clearTimeout(tid);
      
          this.chrome = ChromeProxy.new(connection, {windows: {}, tabs: {}});
          this.open(debuggeeSpec);
    
        }.bind(this), 
        function errback(msg) {
         console.error('Debuggee.attach ERROR:', msg);
        }
      );
      
      window.beforeUnloadQueue.push(function detach() {
        connection.detach();
      });

    },

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
      this.chrome.openNewTab(
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
        
       this.patchInspector();
    },
    
    patchInspector: function(event) {
      if (debug) {
        console.log("DOMContentLoaded on inspectorWindow ", this);
      }
      this.inspectorWindow = window;
      
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
      
      this.completeLoad = WebInspector.delayLoaded; // set by openInspectoer
    
      // Called asynchronously from WebInspector _initializeCapability
      // which is called byt the load event vai doLoadedDone()
      this._doLoadedDoneWithCapabilities = 
        WebInspector._doLoadedDoneWithCapabilities;
    
      WebInspector._doLoadedDoneWithCapabilities = function() {
        var args = Array.prototype.slice.call(arguments, 0);
        this._doLoadedDoneWithCapabilities.apply(WebInspector, args);
        this.navigateToURL();
      }.bind(this);
      this.completeLoad.call(this.inspectorWindow.WebInspector);
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

return Debuggee;

});