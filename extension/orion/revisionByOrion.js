// See Purple/license.txt for Google BSD license
// Copyright 2011 Google, Inc. johnjbarton@johnjbarton.com

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
      function reject(event) {deferred.resolve(event);}
      xhr.addEventListener('error', resolve, false);
      xhr.addEventListener('abort', reject, false);
      xhr.addEventListener('load', reject, false);
      return deferred.promise;
    }
  };

  var RevisionControl = {
    save: function(url, src) {
      var req = XHR.new('PUT', url, true);
      req.send(src);
      return req.promise;
    },
    saveAndCallback: function(url, src, callback, errback) {
      var rc = this.save(url, src);
      Q.when(rc, callback, errback).end();
    }
  };

  return RevisionControl;
});