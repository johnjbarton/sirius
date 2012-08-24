// See Purple/license.txt for Google BSD license
// Copyright 2011 Google, Inc. johnjbarton@johnjbarton.com

/*globals define*/

define(['log/LogBase'], function (LogBase) {

  var Resources = LogBase.extend({
  
  initialize: function(clock) {
    this.resourcesByURL = {}; 
    this._onResourceAdded = this._onResourceAdded.bind(this);
    var name = "resources";
    LogBase.initialize.apply(this, [clock, name]);
  },
  
  connect: function(debuggerProtocol, onConnect) {
    
    function baseConnect(error) {
      chrome.devtools.inspectedWindow.getResources(function onResources(resources) {
        resources.forEach(this._onResourceAdded);
        chrome.devtools.inspectedWindow.onResourceAdded.addListener(this._onResourceAdded);
        onConnect(error);
      }.bind(this));
    }
    
    LogBase.connect.apply(this, [this, baseConnect.bind(this)]);
  },

  disconnect: function(eventSink) {
    if (this.eventSink === eventSink) {
      delete this.eventSink;
    }
  },

  _onResourceAdded: function(resource) {
    this.resourcesByURL[resource.url] = resource;
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
      var resource = this.resourcesByURL[url];
      resource.fetchContent = this.fetchContent.bind(this, url);
      resource.getContent(this.addContent.bind(this, url));
      return resource;
    }
  },
  
  addContent: function(url, content, encoding) {
    var resource = this.resourcesByURL[url];
    resource.content = content;
    resource.encoding = encoding;
  },
  
  fetchContent: function(url) {
      console.error("implement me");
  }
});
  
  return Resources;
});