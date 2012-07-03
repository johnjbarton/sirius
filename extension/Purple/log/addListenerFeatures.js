// Copyright 2011 Google Inc. 
// see Purple/license.txt for BSD license
// johnjbarton@google.com

define([], function(){
  function addListenerFeatures(extendMe) {
    extendMe._listeners = [];
   
    extendMe.addListener = function(fncOfEvent) {
      if (!fncOfEvent) {
        throw new Error("pass a function to addListener", extendMe);
      }
      var index = this._listeners.indexOf(fncOfEvent);
      if (index === -1) {
        this._listeners.push(fncOfEvent);
      }
    };
   
    extendMe.removeListener = function(fncOfEvent) {
      var index = this._listeners.indexOf(fncOfEvent);
      if (index !== -1) {
        this._listeners.splice(index, 1); 
      }
    };
   
    extendMe.getListeners = function() {
      return this._listeners;
    };
    
    extendMe.toEachListener = function(event) {
      var max = this._listeners.length;
      var args = event instanceof Array ? event : Array.prototype.slice.call(arguments);
      for(var i = 0; i < max; i++) {
        this._listeners[i].apply(null, args);
      }
    };

    return extendMe;
  };
  return addListenerFeatures;
});
  