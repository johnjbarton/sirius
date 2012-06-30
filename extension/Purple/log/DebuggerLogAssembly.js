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
     
    connect: function(debuggerProtocol) {
      resources.connect(debuggerProtocol);
      consoleLog.connect(debuggerProtocol);
    }    
  };
  
  return DebuggerLogAssembly;
});