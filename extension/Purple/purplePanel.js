// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

function loadJSAsync() {
require(
  ['OrionEditorEmbedded/editorInserter', 'log/consoleLog', 'resources/Resources', 'log/LogViewportManager'], 
  function(editorInserter, consoleLog,             resources,      LogViewportManager){

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

    function initialize() {
      var globalClock = {p_id: 0};
      
      consoleLog.initialize(globalClock);
      resources.initialize();
      LogViewportManager.initialize(globalClock);
    }

    function connect() {
      var devtoolsProtocol = chrome.devtools.protocol;
      
      consoleLog.connect(devtoolsProtocol, function consoleConnected(error){
        resources.connect(devtoolsProtocol, function resourceConnected(error) {
            LogViewportManager.connect(devtoolsProtocol, function viewportManagerConnected(error){
              LogViewportManager.add(consoleLog);
              LogViewportManager.update();
              console.log("connected");  
            });
 
        });          
      });

      function detach() {
        console.log("detach?");
      }

      window.addEventListener('unload', detach, false);
    }

    function onAttach(connection) {
      initialize();
      
      connect();
      
      window.purple._connection = connection;
      console.log(window.location + ' attach');
  
      connection.register('hello', {
        put: function (obj) {
          return {message:'Did you do your homework?'};
        }
      });
            
      // We have loaded all of our scripts and built our API. Tell our creator
      window.purple._connection.putObject(
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
    
    window.purple.onPanelReady();

  }
);
}

// https://code.google.com/p/chromium/issues/detail?id=135526
window.addEventListener('load', function onLoad() {
    setTimeout(loadJSAsync);
});