// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2012 Google, Inc. johnjbarton@chromium.org

/*global require WebInspector */

require(
  ['overrides/SourceFrame', 'overrides/JavaScriptSourceFrame'], 
  function(   SourceFrame,             JavaScriptSourceFrame) {
  
    WebInspector.SourceFrame = SourceFrame;
    WebInspector.JavaScriptSourceFrame = JavaScriptSourceFrame;
    
  }
);
