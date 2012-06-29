// See Purple/license.txt for Google BSD license
// Copyright 2011 Google, Inc. johnjbarton@johnjbarton.com

/*globals define window */

define(['domplate/lib/domplate', '../resources/Resources', 'reps/reps', '../reps/Rep', 'OrionEditorEmbedded/editorInserter'], 
function (                   domplate,                Resources,          Reps,          Rep,          editorInserter) {
  
  var thePurple = window.purple;
  
  with(domplate.tags) {
    
    var PartLinkRep = domplate.domplate(Rep, {
      tag: A({
          "class":"$object|getPartLinkClass PartLink-$targetPart a11yFocus",
          _target: "$targetPart",
          _repObject: '$object', 
          'onclick': '$clickLink'
      }, "$object|getPartLinkText" ),
      getResourceName: function(object) {
        var url = this.getURL(object);
        if (!url) {
          return "No URL for "+object;
        }
        var splits = url.split('/');
        return splits.slice(-1);
      },
      getPartLinkText: function(object) {
        return this.getResourceName(object);
      },
      getPartLinkClass: function(object) {
        var resource = this.getResource(object);
        return (resource && resource.hasSource) ? 'partLink' : 'noSource';
      },
      
      getResource: function(object) {
        var url = this.getURL(object);
        var resource = Resources.get(url);
        return resource;
      },

      // Implements Rep
      name: "PartLinkRep",
      getRequiredPropertyNames: function() {
        return ['url'];
      },
      getOptionalPropertyNames: function() {
        return ['lineNumber', 'columnNumber']; 
      }
    });
  
  }
  
  PartLinkRep.targetPart = 'editor', // constant for all instances for now
  
  PartLinkRep.getURL = function(object) {
    // override in reps
    return object.url;
  }

  PartLinkRep.getLineNumber = function(object) {
    // override in reps
    return object.lineNumber;
  }
  
  PartLinkRep.getColumnNumber = function(object) {
    // override in reps
    return object.columnNumber;
  }
  
  // Will be called with |this| bound to domplate (rep)
  PartLinkRep.clickLink = function(event) {
    var target = event.currentTarget;  // the element with the handler
    var destinationFeature = target.getAttribute('target');
    var repObject = target.repObject;
    var rep = repObject.rep || PartLinkRep;
    var resource = repObject;
    if (!repObject.fetchContent) {
      var url = rep.getURL(repObject);
      if (url) {
        resource = Resources.get(url);
      } 
      if (! resource.fetchContent) {
        PartLinkRep.onError("No source associated with clickLink target");
        return;
      }
    }
    var lineNumber = rep.getLineNumber(repObject); // the line comes from eg the error message
    var columnNumber = rep.getColumnNumber(repObject); // the line comes from eg the error message
    try {
      rep.openPartWith(target, resource, lineNumber, columnNumber);
    } catch(exc) {
      PartLinkRep.onError(exc);
    }
    event.stopPropagation(); // we only want this one action
    event.preventDefault();
  };
    
  PartLinkRep.openPartWith = function(elt,  resource, lineNumber, columnNumber) {
    var blockElt = elt;
    var display;
    while(blockElt && display !== 'block') {
      var eltStyle = blockElt.currentStyle || window.getComputedStyle(blockElt, "");
      display = eltStyle.display;
      blockElt = blockElt.parentElement;
    }
    editorInserter.open(blockElt, 300, resource.url, lineNumber, columnNumber);
  }
  
  PartLinkRep.onError = function() {
    console.error.apply(console, arguments);
  }
  
  
  Reps.add(PartLinkRep);
  
  return PartLinkRep;
});