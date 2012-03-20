// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

/*global define console window */


define(['q/q', 'appendFrame', 'overrides/overrides'], 
function(  Q,   appendFrame,             overrides)  {

var debug = false;

function showInspectorIframe() {
  var inspectorElt = window.document.getElementById('WebInspector');
  inspectorElt.classList.remove('hide');
  return appendFrame('WebInspector', "inspector/front-end/devtools.html");
}

// Promise the inspectorWindow after the load event is processed

function openInspector(debuggee, chromeProxy) {
  var deferred = Q.defer();
  var inspectorElt = showInspectorIframe();
  var inspectorWindow = inspectorElt.contentWindow;
  
  // Capture the DOMContentLoaded to monkey-patch inspectorWindow.
  //
  inspectorWindow.addEventListener('DOMContentLoaded', function(event){
    
    if (debug) {
      console.log("DOMContentLoaded on inspectorWindow ", debuggee);
    }

    var backend = inspectorWindow.InspectorBackend;

    function sendMessageObject(messageObject) {
      if (debug) {
        console.log(messageObject.id+" atopwi sendCommand "+messageObject.method);
      }
      chromeProxy.debugger.sendCommand(
        debuggee, 
        messageObject.method, 
        messageObject.params, 
        function handleResponse(data) {
          data.id = messageObject.id;
          if (debug) {
            var msg = data.id +
               " atopwi response to sendCommand " + messageObject.method;
            var obj = {messageObject: messageObject, data: data};
            console.log(msg, obj);
          }
          backend.dispatch(data); 
        }
      );
    }
    
    backend.sendMessageObjectToBackend = sendMessageObject;
    
    chromeProxy.jsonHandlers['chrome.debugger.remote'] = {
      jsonObjectHandler:  function(data) {
        if (debug) {
          console.log("jsonObjectHandler "+data.method, data);
        }
        backend.dispatch.apply(backend, [data]);
      }
    };
    
    inspectorWindow.InspectorFrontendHost.sendMessageToBackend = function() {
      throw new Error("Should not be called");
    };
    
    // Called asynchronously from WebInspector _initializeCapability
    var stock_doLoadedDoneWithCapabilities = 
        inspectorWindow.WebInspector._doLoadedDoneWithCapabilities;
    
    inspectorWindow.WebInspector._doLoadedDoneWithCapabilities = function() {
      var args = Array.prototype.slice.call(arguments, 0);
      stock_doLoadedDoneWithCapabilities.apply(this, args);
      
      deferred.resolve(inspectorWindow);
    };
    
    overrides.injectAll(inspectorWindow);
    
  }, true);
  return deferred.promise;
}

return openInspector;

});