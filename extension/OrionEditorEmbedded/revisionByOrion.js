// See license.txt for Google BSD license
// Copyright 2012 Google, Inc. johnjbarton@chromium.org

/*global define XMLHttpRequest */

define(['MetaObject/MetaObject','MetaObject/q/q'], function(MetaObject, Q) {

  var XHR = MetaObject.extend({
    initialize: function(method, url, async) {
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
  });

  var RevisionControl = {
    save: function(url, src) {
      var req = XHR.new('PUT', url, true);
      req.send(src);
      return req.promise;
    }
  };

  return RevisionControl;
});