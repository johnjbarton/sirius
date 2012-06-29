// See Purple/license.txt for Google BSD license
// Copyright 2011 Google, Inc. johnjbarton@johnjbarton.com

/*globals define console alert*/

define(['log/LogBase', 'resources/Resources', 'resources/JavaScriptResource'], 
function (   LogBase,                    Resources,                    JavaScriptResource) {
  
  var JavaScriptResources = {
    getOrCreateJavaScriptResource: function(url, isContentScript, p_id) {
      var resource = Resources.get(url);
      if (!resource) {
        resource = JavaScriptResource.new(url, isContentScript, p_id);
        Resources.append(url, resource);
      } else if ( ! JavaScriptResource.isPrototypeOf(resource) ) {
        // we have a network resource which we just discovered is a JavaScriptResource
        resource = JavaScriptResource.new(url, isContentScript, resource);
        Resources.replace(url, resource, p_id);
      }
      return resource;
    }

  };
  
  var jsEventHandler = LogBase.extend({
    Debugger: {
      events: {
        breakpointResolved: function(breakpointId, location) {
          console.log("JavaScriptEventHandler", arguments);
        },
        paused: function(details) {
          console.log("JavaScriptEventHandler paused", arguments);
          alert("paused");
        },
        resumed: function() {
          console.log("JavaScriptEventHandler", arguments);
        },
        scriptFailedToParse: function(data, errorLine, errorMessage, firstLine, url) {
          console.log("JavaScriptEventHandler", arguments);
        },
        scriptParsed: function(scriptId, url, startLine, startColumn, endLine, endColumn, isContentScript, sourceMapURL, p_id) {
           var res = JavaScriptResources.getOrCreateJavaScriptResource(url, isContentScript, p_id);
           res.appendScript(scriptId, startLine, startColumn, endLine, endColumn);
        }
      }
    },
      Timeline: {
        events : {
          eventRecorded: function(record) {
            console.log("JavaScriptEventHandler", arguments);
          },
          started: function() {
            console.log("JavaScriptEventHandler", arguments);
          },
          stopped: function() {
            console.log("JavaScriptEventHandler", arguments);
          }
        }
    },
    
    initialize: function(clock) {
      var name = 'javascriptLog';
      LogBase.initialize.apply(this, [clock, name]);
    },
    
    connect: function(chromeDebuggerProxy, viewport) {
      chromeDebuggerProxy.registerHandlers(this);
      // This allows the UI to enable/disable the inputs, without consulting this object....
      LogBase.connect.apply(this,[this, viewport]);  
    },
    
    disconnect: function(channel) {
      delete this.store;
    },
    
    //-----------------------------------------------------------------------------
    enable: function() {
      debugger;
    },
    disable: function() {
      debugger; 
    }
  });
  
  
  //---------------------------------------------------------------------------------------------
  //
  
  return jsEventHandler;
});