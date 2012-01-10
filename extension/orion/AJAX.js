// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

/*global define XMLHttpRequest */

define(['../lib/Base','../lib/q/q'], function(Base, Q) {

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
    promiseSave: function(url, src) {
      var req = XHR.new('PUT', url, true);
      req.send(src);
      return req.promise;
    },
    save: function(url, src, callback, errback) {
      var rc = this.promiseSave(url, src);
      if (callback) {
        Q.when(rc, callback, errback).end();
      } else {
        return rc;
      }
    }
  };

  return AJAX;
});