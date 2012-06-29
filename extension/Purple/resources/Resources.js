// See Purple/license.txt for Google BSD license
// Copyright 2011 Google, Inc. johnjbarton@johnjbarton.com

/*globals define*/

define(['log/LogBase'], function (LogBase) {

  var Resources = LogBase.extend({
  
  initialize: function(clock) {
    this.resources = [];
    this.resourcesByURL = {}; // a Resource or an array of
    var name = "resources";
    LogBase.initialize.apply(this, [clock, name]);
  },
  
  connect: function(viewport) {
    LogBase.connect.apply(this,[this, viewport]);  
  },

  disconnect: function(eventSink) {
    if (this.eventSink === eventSink) {
      delete this.eventSink;
    }
  },

  append: function(url, resource) {
    this.resourcesByURL[url] = resource;
    this.resources.push(resource);
    this.post({name: 'created', url: url, resource: resource});
    return resource;
  },

  replace: function(url, resource) {
    var index = this.resources.indexOf(resource);
    this.resources[index] = resource;
    this.resourcesByURL[url] = resource;
    this.post({name: 'updated', url: url, resource: resource});
    return resource;
  },

  get: function(url) {
    if ( this.resourcesByURL.hasOwnProperty(url) ) {
      return this.resourcesByURL[url];
    }
  }
});
  
  return Resources;
});