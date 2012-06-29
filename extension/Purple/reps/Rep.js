// A Purple Rep is a view/controller for an object; Reps lists all for lookup
// See licence.txt for Google BSD license
// Copyright 2011 Google, Inc. johnjbarton@johnjbarton.com


define(['../MetaObject/MetaObject'], function(MetaObject) {
  
  var Rep = MetaObject.extend({
    // the object properties this Rep requires to view the object
    getRequiredPropertyNames: function() {
      return [];
    },
    // the object properties this Rep may use to view the object
    getOptionalPropertyNames: function() {
      return [];
    },
    // A number indicating how good of a match this Rep is for the argument
    // It won't be called unless the object has the properties in the getRequiredPropertyNames.
    // A good number would be the number of properties the Rep can use from the object.
    represents: function(object) {
      return this.countProperties(object); 
    },
    // utility
    countProperties: function(object) {
      var count = 1; // any rep is better than no rep
      count += this.getRequiredPropertyNames().length;
      var props = this.getOptionalPropertyNames();
      for(var i = 0; i < props.length; i++) {
        if (object.hasOwnProperty(props[i])) {
          count++;
        }
      }
      return count;
    }
  });
  
  return Rep;
});