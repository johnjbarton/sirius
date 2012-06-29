// See Purple/license.txt for Google BSD license
// Copyright 2011 Google, Inc. johnjbarton@johnjbarton.com

define(['domplate/lib/domplate', '../resources/PartLinkRep', '../resources/ResourceRep', 'reps/reps'], 
function (                    domplate,                PartLinkRep,                ResourceRep,         Reps) {
  
  var dp = domplate.tags;
    
    var JavaScriptResourceRep = domplate.domplate(
      ResourceRep,
      {
        tag: dp.DIV({'class': 'resourceJS'},
          dp.TAG(PartLinkRep.tag, {object:'$object'})
        ),
        name: 'JavaScriptResourceRep'
      }
    );
  
  Reps.registerPart(JavaScriptResourceRep);
  
  return JavaScriptResourceRep;
});