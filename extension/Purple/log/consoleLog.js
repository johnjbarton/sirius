// See Purple/license.txt for Google BSD license
// Copyright 2011 Google, Inc. johnjbarton@johnjbarton.com

/*global define*/

define(['log/LogBase', 'log/ConsoleEntry'], 
  function   (LogBase,      ConsoleEntry) {
  
  var consoleLog = LogBase.extend(
    // Start with the protocol's base funcions
    chrome.devtools.protocol.Console.prototype,
    {
      // override the notification handlers
      messageAdded: function(message) {
        this._latestEntry = new ConsoleEntry(message);
        this.post(this._latestEntry);
      },
      messageRepeatCountUpdated: function(count) {
        // ignore this for now
      },
      messagesCleared: function() {
        this._latestEntry = ConsoleEntry.messagesClearedEntry;
        this.post(this._latestEntry);
      },
    
      initialize: function(clock) {
        var name = 'consoleLog';
        LogBase.initialize.apply(this, [clock, name]);
      },
      //---------------------------------------------------------------------------------------------
  
      connect: function(debuggerProtocol) {
        LogBase.connect.apply(this, [this]);     
        this.addListeners();  // register with the protocol
        this.enable(function onEnable(){
          console.log("Console.enable");
        });
      },
  
      disconnect: function() {
        if (this.enabled) {
          throw new Error("Disable before disconnecting");
        }
      }
    }
  );

  return consoleLog;
});