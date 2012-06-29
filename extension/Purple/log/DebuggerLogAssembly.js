// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

/*globals define */

define(['log/javaScriptEventHandler', 'log/consoleEventHandler', 'log/networkEventHandler', 'resources/Resources'], 
function(            jsEventHandler,       consoleEventHandler,       networkEventHandler,             resources) {

  var DebuggerLogAssembly = {
     
    initialize: function(clock) {
      jsEventHandler.initialize(clock);
      networkEventHandler.initialize(clock);
      consoleEventHandler.initialize(clock);
      resources.initialize(clock);
    },
     
    connect: function(viewport) {
      this.viewport = viewport;
      resources.connect(this.viewport);
      // we have to wait for onPreAttach to complete the connection
    },
 
    
    onPreAttach: function(debuggerProxy) {
      jsEventHandler.connect(debuggerProxy, this.viewport);
      networkEventHandler.connect(debuggerProxy, this.viewport);
      consoleEventHandler.connect(debuggerProxy, this.viewport);
    },

    onPostAttach: function(debuggerProxy) {
      return Q.all([
        debuggerProxy.Debugger.enable(),
        debuggerProxy.Network.enable(),
        debuggerProxy.Console.enable()
        ]);
    },
    
    showAll: function() {
      jsEventHandler.show();
      networkEventHandler.show();
      consoleEventHandler.show();
    }
    
  };
  
  // Are we having fun yet?
  DebuggerLogAssembly.onPreAttach = DebuggerLogAssembly.onPreAttach.bind(DebuggerLogAssembly);
  DebuggerLogAssembly.onPostAttach = DebuggerLogAssembly.onPostAttach.bind(DebuggerLogAssembly);
  
  return DebuggerLogAssembly;
});