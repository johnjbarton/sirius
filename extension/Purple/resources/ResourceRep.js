// See Purple/license.txt for Google BSD license
// Copyright 2011 Google, Inc. johnjbarton@johnjbarton.com

define(['domplate/lib/domplate', '../resources/PartLinkRep', 'reps/reps'], function (domplate, PartLinkRep, Reps) {
  
  with(domplate.tags) {
    
    var ResourceRep = domplate.domplate(
      PartLinkRep, 
      {
      tag: DIV({'class': 'resource'},
          TAG(PartLinkRep.tag, {object:'$object'})   
        ),
      getPartLinkClass: function(object) {
        return object.requestId ? 'partLink' : ""; 
      },
      getOptionalPropertyNames: function() {
        return PartLinkRep.getOptionalPropertyNames().push('requestId');
      },
      name: 'ResourceRep',
    });
  
  }
  
  // jjb I guess we could register the reps where we require() them.
  Reps.registerPart(ResourceRep);
  
  return ResourceRep;
});