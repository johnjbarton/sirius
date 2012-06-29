// See Purple/license.txt for Google BSD license
// Copyright 2011 Google, Inc. johnjbarton@johnjbarton.com

define(['log/consoleEntryRep'], 
function (consoleEntryRep) {
  
  function ConsoleEntry(message) {
    //  http://code.google.com/chrome/devtools/docs/protocol/0.1/console.html#type-ConsoleMessage
    this.message = message;
    var stack = message.stackTrace;
    if (stack && stack.length) {
      this.message.stack = stack;
      // inline scripts sometimes have a blank URL, use the stack for these.
      if (!this.message.url) {
        this.message.url = stack[0].url;
      }
      if (!this.message.line) {
        this.message.line = stack[0].lineNumber;
      }
    }
    this.rep = consoleEntryRep;
  }
  
  ConsoleEntry.messagesClearedEntry = new ConsoleEntry("");
  ConsoleEntry.messagesClearedEntry.rep = consoleEntryRep.messagesClearedEntryRep;
  
  return ConsoleEntry;
});