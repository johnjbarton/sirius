// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

function loadJSAsync() {
require(
  ['log/editorLog', 'log/consoleLog', 'resources/Resources', 'log/LogViewportManager'], 
function(editorLog,      consoleLog,             resources,      LogViewportManager){

    
    window.purple.onShowResource = editorLog.onShowResource.bind(editorLog);

    function initialize() {
      var globalClock = {p_id: 0};
      
      editorLog.initialize(globalClock);
      consoleLog.initialize(globalClock);
      
      resources.initialize();
      LogViewportManager.initialize(globalClock);
    }

    function connect() {
      var devtoolsProtocol = chrome.devtools.protocol;
      
      editorLog.connect(devtoolsProtocol, function editorConnected(error) {
        consoleLog.connect(devtoolsProtocol, function consoleConnected(error){
          resources.connect(devtoolsProtocol, function resourceConnected(error) {
              LogViewportManager.connect(devtoolsProtocol, function viewportManagerConnected(error){
                LogViewportManager.add(editorLog);  
                LogViewportManager.add(consoleLog);
                console.log("connected");  
              });
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
    console.log("purplePanel load event");
    setTimeout(loadJSAsync);
});