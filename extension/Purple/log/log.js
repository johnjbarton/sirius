// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

/*globals getChromeExtensionPipe window console Q require document */

function failConnection(err) {
    console.error("Error "+err, err);
    alert(err);
}

window.debugChromeDebuggerRemote = false;

function initialize() {

  require(['log/DebuggerLogAssembly'], 
    function ( DebuggerLogAssembly) {
       var globalClock = {p_id: 0};
       DebuggerLogAssembly.initialize(globalClock);
       
       DebuggerLogAssembly.connect(viewport);

       function detach() {
         connection.detach();
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



