// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2012 Google, Inc. johnjbarton@chromium.org

/*global require WebInspector window  console */


// Runs in WebInspector window scope

(function() {

var doLoadedDone = WebInspector.doLoadedDone;
WebInspector.doLoadedDone = function() {
  console.log("The monkey got doLoadedDone...");
};

require(
  ['overrides/SourceFrame', 'overrides/JavaScriptSourceFrame'], 
  function(   SourceFrame,             JavaScriptSourceFrame) {
  
    WebInspector.SourceFrame = SourceFrame;
    WebInspector.JavaScriptSourceFrame = JavaScriptSourceFrame;
    console.log('overrides applied', WebInspector.SourceFrame);
    
    // see openInspector
    window.WebInspectorMonkeyPatchDeferred.resolve(doLoadedDone);
  }
);


}());