// See Purple/license.txt for Google BSD license
// Copyright 2011 Google, Inc. johnjbarton@johnjbarton.com

/*global define*/

define(['log/LogBase', 'log/ConsoleEntry'], 
  function   (LogBase,      ConsoleEntry) {
  
  var consoleEventHandler = LogBase.extend({
    Console: {
      events: {
        messageAdded: function(message) {
          consoleEventHandler.latestEntry = new ConsoleEntry(message);
          this.post(consoleEventHandler.latestEntry);
        },
        messageRepeatCountUpdated: function(count) {
          // ignore this for now
        },
        messagesCleared: function() {
          consoleEventHandler.latestEntry = ConsoleEntry.messagesClearedEntry;
          this.post(consoleEventHandler.latestEntry);
        }
      }
    },
    
    initialize: function(clock) {
      var name = 'consoleLog';
      LogBase.initialize.apply(this, [clock, name]);
    },
    //---------------------------------------------------------------------------------------------
    // Implement PurplePart
  
    // Return a promise that the Console is enabled
    connect: function(chromeDebuggerProxy, viewport) {
      chromeDebuggerProxy.registerHandlers(this);
      LogBase.connect.apply(this, [this, viewport]);   // this causes the event store to be pulled into the viewport   
    },
  
    disconnect: function() {
      if (this.enabled) {
        throw new Error("Disable before disconnecting");
      }
    }

  });


  return consoleEventHandler;
});