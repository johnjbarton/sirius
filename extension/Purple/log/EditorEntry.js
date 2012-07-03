// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

define(['reps/editorEntryRep'], 
function (editorEntryRep) {
  
  function EditorEntry(resource, line) {
  	this.resource = resource;
  	this.line = line;
    this.rep = editorEntryRep;
  }
  
  return EditorEntry;
});