// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

/*global define console window */


define(['crx2app/rpc/ChromeProxy'], 
function(            ChromeProxy)  {

  var debug = false;

  function Debuggee(iframeDomain) {
    this.iframeDomain = iframeDomain;
  }
  
  Debuggee.prototype = {
    attachToParent: function() {
      console.log(window.location + ' talking ');
      RESTChannel.talk(window.parent, function(connection) {
        this.register(connection);
        console.log('Debuggee connected');
      }.bind(this));
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

      var connection = getChromeExtensionPipe()
      
      var tid = window.setTimeout(function offerExtension() {
        // TODO
        window.alert('Requires: https://github.com/johnjbarton/crx2app');
      }, 2000);
  
      // listen for a connection.
      connection.attach(
        function onConnectedToChrome() {
          // we have connected to the extension, so clear the offer
          window.clearTimeout(tid);
      
          this.chrome = ChromeProxy.new(
            connection, 
            {
              windows: {}, 
              tabs: { onRemoved: function() { console.log('tab removed');}}
            });
          this.open(debuggeeSpec);
    
        }.bind(this), 
        function errback(msg) {
         console.error('Debuggee.attach ERROR:', msg);
        }
      );
      
      window.beforeUnload = function detach() {
        connection.detach();
      };

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
          window.beforeUnload = this.close.bind(this);
          this.attach();
        }.bind(this)
      );
    },
    
    close: function() {
      this.chrome.tabs.remove(newTabId, function() {
        if (debug) {
          console.log('atopwi removed '+newTabId);
        }
        connection.detach();
      });
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
       
      window.beforeUnload = this.detach.bind(this);
        
       this.patchInspector();
    },
    
    detach: function() {
      this.chrome.debugger.detach({tabId: this.tabId}, function() {
         if (debug) {
            console.log('atopwi detached from ' + this.tabId);
          }
         this.close();
       }.bind(this));
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
        this.loadExtensions();
        this.navigateToURL();
      }.bind(this);
      this.completeLoad.call(this.inspectorWindow.WebInspector);
    },
    
    // When called as a WebApp, devtools extensions are loaded.
    loadExtensions: function() {
	  var optionsString = localStorage.getItem('options');
	  if (optionsString) {
            var options = JSON.parse(optionsString);
            if (options.extensionInfos && options.extensionInfos.length) {
	      this.startListener();
              WebInspector.addExtensions(options.extensionInfos);
            }
          } 
          this.navigateToURL();
    },
  
    startListener: function() {
      var disposer = RESTChannel.listen(window, this.panelProxySetup.bind(this));
      window.addEventListener('unload', disposer);
    },

    panelProxySetup: function(connection) {
	  console.error('implement ', connection);
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