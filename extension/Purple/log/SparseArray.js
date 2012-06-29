// See Purple/license.txt for Google BSD license
// Copyright 2011 Google, Inc. johnjbarton@johnjbarton.com

define(['MetaObject/MetaObject'], 
  function (MetaObject) {
  
  var SparseArray = {};
  
  SparseArray.set = function(p_id, data) {
    this.objectsByP_ID[p_id] = data;
    this.p_ids.push(p_id);
  };
  
  // maybe undefined.
  SparseArray.get = function(p_id) {
    return this.objectsByP_ID[p_id];
  };
  
  SparseArray.Iterator = MetaObject.extend({
    initialize: function(sparseArray) {
      this.sparseArray = sparseArray;
    },
    next: function() {
      if (!this.index) {
        this.index = this.sparseArray.p_ids.length;
      }
      this.index--;
      if (this.index < 0) {
        return undefined;
      } else {
        var p_id = this.p_ids[this.index];
        return this.sparseArray.objectsByP_ID[p_id];
      }
    }
  });
  
  SparseArray.initialize = function(name) {
    this.name = name;
    this.objectsByP_ID = {};
    this.p_ids = [];
  };
  
  return MetaObject.extend(SparseArray);
});