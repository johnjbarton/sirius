// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

define(['log/LogBase', 'log/EditorEntry'], 
function(    LogBase,       EditorEntry){

    var editorLog = LogBase.extend({
      initialize: function(clock) {
        var name = 'editorLog';
        LogBase.initialize.apply(this, [clock, name]);
      },

      connect: function(debuggerProtocol, onConnect) {
        LogBase.connect.apply(this, [this, function baseConnected(error) {
            onConnect(error);
        }.bind(this)]);     
      },

      onShowResource: function(resource, line) {
      	this.post( new EditorEntry(resource, line) );
      }
    });
    
    return editorLog;
	
});