// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

/*globals getChromeExtensionPipe window console Q require document */

function failConnection(err) {
    console.error("Error "+err, err);
    alert(err);
}

window.debugChromeDebuggerRemote = false;

function initialize() {

  require(['log/consoleLog', 'log/LogViewportManager'], 
    function (  consoleLog,   LogViewportManager) {
      var globalClock = {p_id: 0};
      
      consoleLog.initialize(globalClock);
      LogViewportManager.initialize(globalClock);
       
      consoleLog.connect(chrome.devtools.protocol);
      LogViewportManager.connect();

      LogViewportManager.add(consoleLog);

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



