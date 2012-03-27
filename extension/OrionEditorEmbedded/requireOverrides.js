// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2012 Google, Inc. johnjbarton@chromium.org

/*global require document */

require(
  ['OrionEditorEmbedded/editorInserter'], 
  function(editorInserter){
    var editor = editorInserter.createEditor(document.body, '400px');
  }
);
