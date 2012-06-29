// See Purple/license.txt for Google BSD license
// Copyright 2011 Google, Inc. johnjbarton@johnjbarton.com

/*globals define */

define(['log/LogBase', 'resources/Resources', 'resources/Resource'], 
function (   LogBase,             Resources,             Resource) {

  var networkEventHandler = LogBase.extend({
  
   getOrCreateResource: function(url) {
      var resource = Resources.get(url);
      if (!resource) {
        resource = Resource.new(url);
        Resources.append(url, resource);
      }
      return resource;
    },
    
  setRequestById: function(requestId, resource) {
    this.requests[requestId] = resource;
    // close over the handler here to narrow the interface to Resource
    // |this| will be bound to a Resource
    var remote = this.chromeDebuggerProxy;
    resource.fetchContent = function (fncOfContent, fncOfError) {
      if (this.requestId) {
        var responseBody = remote.Network.getResponseBody(this.requestId);
        Q.when(responseBody, fncOfContent, fncOfError);
      } else {
        fncOfError("Resource not loaded: "+this.url);
      }
    };
 
    resource.hasSource = true;
  },
  
  getRequestById: function(requestId) {
    if (this.requests.hasOwnProperty(requestId)) {
      return this.requests[requestId];
    } else {
      throw new Error("Expected resource at "+requestId+"but none was found");
    }
  },

    Network: {
      events: {
      
        requestWillBeSent: function(requestId, frameId, loaderId, documentURL, request, timestamp, initiator, stackTrace, redirectResponse){
          var url = request.url;
          var resource = networkEventHandler.getOrCreateResource(url);
          resource.documentURL = documentURL;
          resource.requestId = requestId;
          resource.loaderId = loaderId;
          resource.request = request;
          resource.timestamps = {"sent": timestamp};
          resource.initiator = initiator;
          resource.stackTrace = stackTrace;
          resource.redirectResponse = redirectResponse;
          networkEventHandler.setRequestById(requestId, resource);
          this.post(resource);
        },
        
        requestServedFromCache: function(requestId){
          var resource = networkEventHandler.getRequestById(requestId);
          resource.servedFromCache = true;
        },
        
        responseRecieved: function(requestId, frameId, loaderId, timestamp, type, response){
          var resource = networkEventHandler.getRequestById(requestId);
          resource.timestamps.responseRecieved = timestamp;
          resource.type = type;
          resource.response = response;
        },

        dataReceived: function(requestId, timestamp, dataLength, encodedDataLength){
          var resource = networkEventHandler.getRequestById(requestId);
          resource.progress = resource.progress || [];
          resource.progress.push({timestamp: timestamp, dataLength: dataLength, encodedDataLength: encodedDataLength});
        },
        
        loadingFinished: function(requestId, timestamp){
          var resource = networkEventHandler.getRequestById(requestId);
          resource.timestamps.loadingFinished = timestamp;
        },

        loadingFailed: function(requestId, timestamp, errorText, canceled){
          var resource = networkEventHandler.getRequestById(requestId);
          resource.timestamps.loadingFailed = timestamp;
          resource.errorText = errorText;
          resource.canceled = canceled;
        },
        
        requestServedFromMemoryCache: function(requestId, frameId, loaderId, documentURL, timestamp, initiator, cachedResource){
          var url = cachedResource.url;
          var resource = networkEventHandler.getOrCreateResource(url);
          resource.documentURL = documentURL;
          resource.requestId = requestId;
          resource.loaderId = loaderId;
          resource.timestamps = {"fromMemoryCache": timestamp};
          resource.initiator = initiator;
          resource.resource = cachedResource;
          networkEventHandler.setRequestById(requestId, resource);
          this.post(resource);
        }
      }
    },
    WebNavigation: {
      events: {
        onBeforeNavigate: function(details, p_id){
          networkEventHandler.store.set(p_id, details);
        },
        onBeforeRetarget: function(details, p_id){
          networkEventHandler.store.set(p_id, details);
        },
        onCommitted: function(details, p_id){
          networkEventHandler.store.set(p_id, details);
        },
        onCompleted: function(details, p_id){
          networkEventHandler.store.set(p_id, details);
        },
        onDOMContentLoaded: function(details, p_id){
          networkEventHandler.store.set(p_id, details);
        },
        onErrorOccurred: function(details, p_id){
          networkEventHandler.store.set(p_id, details);
        }
      }
    },
    
    initialize: function(clock) {
      var name = 'networkLog';
      this.requests = {};
      LogBase.initialize.apply(this, [clock, name]);
    },
  
  
    //---------------------------------------------------------------------------------------------
  
    connect: function(chromeDebuggerProxy, viewport) {
      this.chromeDebuggerProxy = chromeDebuggerProxy;
      chromeDebuggerProxy.registerHandlers(this);  
      LogBase.connect.apply(this, [this, viewport]);
    },
  
    disconnect: function() {
    }
    
  });
  
  return networkEventHandler;
});