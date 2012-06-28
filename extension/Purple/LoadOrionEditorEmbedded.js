
require(
  ['OrionEditorEmbedded/editorInserter'], 
  function(editorInserter){
    var editor = editorInserter.createEditor(document.body, '100%');
    editor.installTextView();
  }
);
