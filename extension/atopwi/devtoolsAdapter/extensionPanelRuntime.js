// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

/*globals console window RESTChannel*/

var ChromeDevtools = ChromeDevtools || {};

RESTChannel.talk(window.parent, function onAttach(connection) {
  
  function logError() {
    console.error('ChromeDevtools.proxy ERROR', arguments);
  }
  
  // underlying API for generated API functions
  ChromeDevtools.proxy = {
    debug: true,
    
    // Proxy debugger commands to our parent window
    sendCommand: function(domainMethod, params, callback, errback) {
      var url = 'ChromeDevtools.sendCommand';
      var obj = {
        method: domainMethod,
        params: params
      };
      callback = callback || function() {};
      errback = errback || logError;
      connection.postObject(url, obj, callback, errback);
    },
    
    // Dispatch debugger events from our parent window
    // Similar to WebInspector.registerDomainDispatcher
    onEvent: function(domain, listenerObject) {
      var remoteRef = connection.register('ChromeDevtools.onEvent.' + domain, {
          post: function(connection, messageObject) {
            var domainMethod = messageObject.method;
            var method = domainMethod.split('.')[1];
            var params = [];
            var messageParams = messageObject.params;
            if (messageParams) {
              var paramNames = this._eventArgs[domainMethod];
              for (var i = 0; i < paramNames.length; ++i) {
                params.push(messageObject.params[paramNames[i]]);
              }
            }
            listenerObject[method].apply(listenerObject, params);
          }.bind(this)
      });
      connection.putObject(
        'ChromeDevtools.onEvent.addListener.'+domain,
        remoteRef,
        function eatReply() {
          if (ChromeDevtools.proxy.debug) {
            console.log('ChromeDevtools.onEvent.addListener succeeds');
          }
        },
        function fail() {
          console.error('ChromeDevtools.onEvent.addListener ERROR ', arguments);
        }
      );
    },
    
    _eventArgs: {},
    // Called by generated API to build argument name lists.
    registerEvent: function(domainMethod, params) {
      this._eventArgs[domainMethod] = params;
    }
  };

  
});