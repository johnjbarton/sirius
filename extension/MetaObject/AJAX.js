// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

// v2

/*global define XMLHttpRequest */

define(['MetaObject/q/q'], function(Q) {

  var XHR = {
    'new': function(method, url, async) {
      var xhr = new XMLHttpRequest();  //[[ProtoLink]]: XMLHttpRequest.prototype
      xhr.promise = XHR.setPromise(xhr);
      xhr.open(method, url, async);
      return xhr;
    },
    setPromise: function(xhr) {
      var deferred = Q.defer();
      function resolve(event) {deferred.resolve(event);}
      function reject(event) {deferred.reject(event);}
      xhr.addEventListener('error', reject, false);
      xhr.addEventListener('abort', reject, false);
      xhr.addEventListener('load', resolve, false);
      return deferred.promise;
    }
  };

  var AJAX = {
    promisePUT: function(url, src) {
      var req = XHR.new('PUT', url, true);
      req.send(src);
      return req.promise;
    },
    promiseGET: function(url) {
      var req = XHR.new('GET', url, true);
      req.send();
      return req.promise;
    }
  };
  
  function wrapWithCallbacks(obj, promising) {
    return function() {
      // eg arguments: url || url, callback || url, callback, errback
      var errback = arguments[arguments.length - 1]; 
      var callback = arguments[arguments.length - 2];
      if (typeof callback !== 'function') { // assume no errback
        callback = errback;
        errback = undefined;
        if (typeof callback !== 'function') { // no callback either
          callback = undefined;
        }
      }
      var promised = promising.apply(obj, arguments);
      if (callback) {
        Q.when(promised, callback, errback).end(); 
      } else {
        return promised;
      }
    };
  }
  
  // create PUT(url, src, callback, errback) for each PUT(url, src);
  Object.keys(AJAX).forEach(function wrap(promiseX) {
      if (promiseX.indexOf('promise') === 0) {
        var X = promiseX.substr(7);
        AJAX[X] = wrapWithCallbacks(AJAX, AJAX[promiseX]);
      } // else ignore
  });
  

  return AJAX;
});