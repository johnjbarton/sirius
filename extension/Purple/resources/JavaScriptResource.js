// See Purple/license.txt for Google BSD license
// Copyright 2011 Google, Inc. johnjbarton@johnjbarton.com

/*globals define*/

define(['../resources/Resource', '../resources/JavaScriptResourceRep'], function (Resource, JavaScriptResourceRep) {
  
  var JavaScriptResource = Resource.extend({
  
    initialize: function (url, isContentScript, asVanillaResource) {
      if (asVanillaResource) {
        Object.keys(asVanillaResource).forEach(function(prop) {
          this[prop] = asVanillaResource[prop];
        }.bind(this));
      }
      this.url = url;
      this.isContentScript = isContentScript;
      this.scripts = {};
      this.targetPart = "editor";
      this.rep = JavaScriptResourceRep;
    },
    
    appendScript: function(scriptId, startLine, startColumn, endLine, endColumn) {
      this.scripts = this.scripts || {};
      this.scripts[scriptId] = [startLine, startColumn, endLine, endColumn];
    }

  });
  
  return JavaScriptResource;
});