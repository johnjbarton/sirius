
require(
  ['OrionEditorEmbedded/editorInserter'], 
  function(editorInserter){

    function onAttach(connection) {
    
      window.purple.connection = connection;
      console.log(window.location + ' attach');
  
      connection.register('hello', {
        put: function (obj) {
          return {message:'Did you do your homework?'};
        }
      });
      
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
        editorByURL[url] = new PurpleOrionEditor(url, content, type);
      };
      
      window.purple.setCursorOn = function(url, line, column, character) {
          var editor = editorByURL[url];
          if (editor) {
              editor.setCursorOn(line, column, character);
          } else {
              console.error("no editor for url "+url);
          }
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

    console.log(window.location + ' listening');
    var onUnload = RESTChannel.listen(window, onAttach);
    window.addEventListener('unload', onUnload);
  }
);
