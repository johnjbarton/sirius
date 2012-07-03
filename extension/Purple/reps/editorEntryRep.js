// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

define(['OrionEditorEmbedded/editorInserter', 'resources/Resources'], 
	function(                editorInserter,             resources) {
	 
	 var editorsByURL = {};
 
    function PurpleOrionEditor(url, content, type) {
      this._orion_editor = editorInserter.createEditor(document.body, '100%');
      this._orion_editor.installTextView();
      this._orion_editor.setInput(url, undefined, content );   
    }
    
    PurpleOrionEditor.prototype = {
      setCursorOn: function(line, column, character) {
        var start = 1;
        var end = 10;
        this._orion_editor.setSelection(start, end, true);
      },
      _onSave: function() {
          console.log("save called", arguments);
      }
    };  
      
    window.purple.showContent = function(url, content, type) {
      editorsByURL[url] = new PurpleOrionEditor(url, content, type);
    };
      
    window.purple.setCursorOn = function(url, line, column, character) {
        var editor = editorsByURL[url];
        if (editor) {
            editor.setCursorOn(line, column, character);
        } else {
            console.error("no editor for url "+url);
        }
    };
	return {};
});