// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

/*globals getChromeExtensionPipe window console Q require document */

function failConnection(err) {
    console.error("Error "+err, err);
    alert(err);
}

window.debugChromeDebuggerRemote = false;

function initialize() {

  require(['log/consoleLog', 'resources/Resources', 'log/LogViewportManager'], 
    function (  consoleLog,             resources,      LogViewportManager) {
      var globalClock = {p_id: 0};
      
      consoleLog.initialize(globalClock);
      resources.initialize();
      LogViewportManager.initialize(globalClock);
      
      var devtoolsProtocol = chrome.devtools.protocol;
      
      consoleLog.connect(devtoolsProtocol, function consoleConnected(error){
        resources.connect(devtoolsProtocol, function resourceConnected(error) {
            LogViewportManager.connect(devtoolsProtocol, function viewportManagerConnected(error){
              LogViewportManager.add(consoleLog);
              console.log("connected");  
            });
 
        });          
      });

      function detach() {
        console.log("detach?");
      }

       window.addEventListener('unload', detach, false);
  });
}

function onLoad() {
  // clean up
  window.removeEventListener('load', onLoad, false);
  
  // connect to the chromeIframe
  initialize();
}

window.addEventListener('load', onLoad, false);



