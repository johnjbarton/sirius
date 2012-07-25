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

    initialize();
      
    connect();
      
    console.log(window.location + ' listening');
    
  }
);
}

// https://code.google.com/p/chromium/issues/detail?id=135526
window.addEventListener('load', function onLoad() {
    console.log("purplePanel load event");
    setTimeout(loadJSAsync);
});