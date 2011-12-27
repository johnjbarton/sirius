// See Purple/license.txt for Google BSD license
// Copyright 2011 Google, Inc. johnjbarton@johnjbarton.com

define([], function () {
  
  // https://github.com/Gozala/selfish
  
  var Base = {
    'new': function() {
      var obj = Object.create(this);
      obj.initialize.apply(obj, arguments);
      return obj;
    },
    
    merge: function() {
       var result = this;
       for (var i = 0; i < arguments.length; i++) {
         var argument = arguments[i];
         Object.keys(argument).forEach(function mergeOne(key) {
           result[key] = argument[key];
         });
       }
       return result;
    },
    
    extend: function() {
      // An empty object with |this| as its prototype, and props from arguments
      return this.merge.apply(Object.create(this), arguments);
    }
  };  
    
  return Base;
});