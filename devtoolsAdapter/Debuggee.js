// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

/*global define console WebInspector RESTChannel getChromeExtensionPipe window */


define(['crx2app/rpc/ChromeProxy'], 
function(            ChromeProxy)  {

  var debug = true;
  
  //  inject our communications endpoints

  function ScriptInjector(urls) {
     this.urls = urls;
  }

  ScriptInjector.prototype = {

    injectScripts: function(chromeProxy, tabId) {
        this.files = this.urls.slice(1);
        this.chrome = chromeProxy;
        this._continueInjection(tabId);
    },
    
    // Recurse by chaining off the callback, 
    _continueInjection: function(tabId) {
      if(this.files.length) {
        this._injectScript(this.files.shift(), tabId);
      } else {
        delete this.files;
      }
    },
    
    _injectScript: function(file, tabId) {
      chrome.tabs.executeScript(
        tabId, 
        {file: file, allFrames: true}, 
        function() {
          this._continueInjection(tabId);  
        }
      );
    }
  };
  
  
  function echoOk() {
    if (debug) {
      console.log('ok ', arguments);
    }
  }
  
  function echoErr() {
    console.error('ERROR ', arguments);
  }

  function Debuggee(iframeDomain) {
    this.iframeDomain = iframeDomain;
  }
  
  Debuggee.prototype = {
    attachToParent: function() {
      console.log(window.location + ' talking ');
      RESTChannel.talk(window.parent, function(atopwi) {
        this.register(atopwi);
        console.log('Debuggee connected');
      }.bind(this));
    },
    
    options: function() {
      return {
        put: '{url: string || tabId: number}'
      };
    },
        
    put: function (atopwi, obj) {
      this.attachToChrome(obj);
      return {message:'hey'};
    },
    
    register: function(atopwi) {
      atopwi.register(
        'debuggee',
        { options: this.options.bind(this), put: this.put.bind(this) }
      );
    },
  
    attachToChrome: function(debuggeeSpec) {

      this.chromeConnection = getChromeExtensionPipe();
      
      var tid = window.setTimeout(function offerExtension() {
        // TODO
        window.alert('Requires: https://github.com/johnjbarton/crx2app');
      }, 2000);
  
      // listen for a connection.
      this.chromeConnection.attach(
        function onConnectedToChrome() {
          // we have connected to the extension, so clear the offer
          window.clearTimeout(tid);
                
          this.chrome = ChromeProxy.new(
            this.chromeConnection, 
            {
              windows: {}, 
              tabs: { onRemoved: function() { console.log('tab removed');}}
              //debugger event listeners are added during load
            });
          this.open(debuggeeSpec);
    
        }.bind(this), 
        function errback(msg) {
         console.error('Debuggee.attach ERROR:', msg);
        }
      );
      
      window.beforeUnload = function detach() {
        this.chromeConnection.detach();
      }.bind(this);

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
    
    close: function(newTabId) {
      this.chrome.tabs.remove(newTabId, function() {
        if (debug) {
          console.log('atopwi removed '+newTabId);
        }
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
         this.close(this.tabId);
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
          this.onEvent(this.panelConnection, data);
        }.bind(this)
      };
    
      this.inspectorWindow.InspectorFrontendHost.sendMessageToBackend = function() {
        throw new Error("Should not be called");
      };
      /*
      this.inspectorWindow.InspectorFrontendHost.setInjectedScriptForOrigin = function(origin, script) {
          script += "(null, null, 7);\ndebugger; window.alert('executeScript in ' + window.location + ' devtools: ' + Object.keys(chrome.devtools));";
        this.chrome.windows.setInjectedScriptForOrigin(origin, script, function() {
            if (debug) {
              console.log("OK: setInjectedScriptForOrigin " + origin);
            }
        });
      }.bind(this);
*/
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
      var optionsString = window.localStorage.getItem('options');
      if (optionsString) {
        var options = JSON.parse(optionsString);
        if (options.extensionInfos && options.extensionInfos.length) {
          WebInspector.addExtensions(options.extensionInfos);
          /*
          this.chrome.windows.injectScripts(function() {
              if (debug) {
                console.log("OK: injectScripts");
              }
          });
          */  
        }
      }
      this.navigateToURL();
    },

    domains: [
        "Inspector",
         "Memory",
         "Page",
         "Runtime",
         "Console",
         "Network",
         "Database",
         "DOMStorage",
         "ApplicationCache",
         "FileSystem",
         "DOM",
         "CSS",
         "Timeline",
         "Debugger",
         "DOMDebugger",
         "Profiler",
         "Worker"
    ],
    
    _eventListenersByDomain: {},

    panelProxySetup: function(connection) {
      this.panelConnection = connection;
      this.panelConnection.register('ChromeDevtools.sendCommand', {
        post: this.proxySendCommand.bind(this, this.panelConnection)
      });

      // To avoid dispatching every event to every panel we create one listener for each domain
      this.domains.forEach(function(domain) {
        this.panelConnection.register('ChromeDevtools.onEvent.addListener.'+domain, {
            put: function(connection, messageObject) {
              this._eventListenersByDomain[domain] = messageObject.url;
              console.log("Debuggee addListener "+messageObject.url, messageObject);
            }.bind(this)
        });
      }.bind(this));
      
    },
    
    proxySendCommand: function(panelConnection, messageObject) {
    // Call from ExtensionServer.sendCommand
      this.chrome.debugger.sendCommand(
          {url: this.url, tabId: this.tabId}, 
           messageObject.method, 
           messageObject.params, 
           panelConnection.respond.bind(panelConnection, messageObject.serial)
      );
    },
    
    onEvent:function(panelConnection, messageObject) {
    // Call ExtensionServer._notifyRemoteDebugEvent
      var domainMethod = messageObject.method;
      var domain = domainMethod.split('.')[0];
      var handler = this._eventListenersByDomain[domain];
      if (handler) {
        panelConnection.postObject(handler, messageObject, echoOk, echoErr);
      } else {
        if (debug) {
          console.log('Debuggee.onEvent: no handler for ' + domain);
        }
      }
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