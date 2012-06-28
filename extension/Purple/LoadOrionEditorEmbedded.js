
require(
  ['OrionEditorEmbedded/editorInserter'], 
  function(editorInserter){
       
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
      
    window.purple.createEditor = function(url, content, type) {
      return new PurpleOrionEditor(url, content, type);
    };
    
    // We have loaded all of our scripts and built our API. Tell our creator
    window.purple.connection.putObject(
      'hello', 
      {message:'I am your purplePanel'},
      function(reply) {
        console.log("purplePanel hears: "+reply.message, reply);
      },
      function(err) {
        console.error("purplePanel recvd err", err);
      }
    );
  }
);
