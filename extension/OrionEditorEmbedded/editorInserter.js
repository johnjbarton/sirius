// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2012 Google, Inc. johnjbarton@chromium.org

/*global define console */

define(['OrionEditorEmbedded/OrionEditor'], function(OrionEditor) {

'use strict';

var editorContainerHTML =
  "  <div class='orion-editor' id='editor'>" +
  "  </div>" +
  "  <div class='contentAssist' id='contentAssist'>";

var editorInserter = {

  /* Create the editor control, no content
  ** @param parentElement DOM element holding editor
  ** @param opt_height style value, default to 300px
  ** @return OrionEditor
  */

  createEditor: function(parentElement, opt_height) {      
      parentElement.innerHTML = editorContainerHTML;
      parentElement.querySelector('.orion-editor').style.height= opt_height || '100%';
      this.orionEditor = new OrionEditor(parentElement.firstElementChild);
      this.orionEditor.setInput('untitled.js', null, 'function foo() {\n  return 1;\n}');
      return this.orionEditor;
  }
};  
  //-------------------------------------------

return editorInserter;

});
