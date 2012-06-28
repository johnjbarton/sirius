
require(
  ['OrionEditorEmbedded/editorInserter'], 
  function(editorInserter){
    window.purple = {
      createEditor: function(url, content, type) {
          var editor = editorInserter.createEditor(document.body, '100%');
          editor.installTextView();   
          return editor;
      }
    }
    
  }
);
