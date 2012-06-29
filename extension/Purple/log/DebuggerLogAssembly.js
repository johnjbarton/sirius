// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

/*globals define */

define(['log/consoleLog',  'resources/Resources'], 
function(    consoleLog,              resources) {

  var DebuggerLogAssembly = {
     
    initialize: function(clock) {
      consoleLog.initialize(clock);
      resources.initialize(clock);
    },
     
    connect: function(viewport) {
      this.viewport = viewport;
      resources.connect(this.viewport);
      // we have to wait for onPreAttach to complete the connection
    },
 
    
    onPreAttach: function(debuggerProxy) {
      consoleLog.connect(debuggerProxy, this.viewport);
    },

    onPostAttach: function(debuggerProxy) {
        debuggerProxy.Console.enable()
    },
    
    showAll: function() {
      consoleLog.show();
    }
    
  };
  
  return DebuggerLogAssembly;
});