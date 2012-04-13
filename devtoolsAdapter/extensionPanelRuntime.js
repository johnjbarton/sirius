// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

var ChromeDevtools = ChromeDevtools || {};

RESTChannel.talk(window.parent, function onAttach(connection) {
  
  function logError() {
    console.error('ChromeDevtools.proxy ERROR', arguments);
  }
  
  // underlying API for generated API functions
  ChromeDevtools.proxy = {
  
    // Proxy debugger commands to our parent window
    sendCommand: function(domain, method, params, callback, errback) {
      var url = 'ChromeDevtools.' + domain + '.' + method;
      callback = callback || function() {};
      errback = errback || logError;
      connection.postObject(url, params, callback, errback);
    },
    
    // Dispatch debugger events from our parent window
    // Similar to WebInspector.registerDomainDispatcher
    onEvent: function(domain, listenerObject) {
      var url = 'ChromeDevtools.onEvent.'+domain;
      connection.register(url, {
        post: function(messageObject) {
          var method = messageObject.method;
          var params = [];
          if (messageObject.params) {
            var paramNames = this._eventArgs[domain + '.' + method];
            for (var i = 0; i < paramNames.length; ++i) {
              params.push(messageObject.params[paramNames[i]]);
            }
          }
          listenerObject[method].apply(listenerObject, params);
        }
      });
    },
    
    _eventArgs: {},
    // Called by generated API to build argument name lists.
    registerEvent: function(domain, method, params) {
      this._eventArgs[domain + '.' + method] = params;
    }
  };

  
});