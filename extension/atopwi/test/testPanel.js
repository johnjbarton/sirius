console.log("Testing chrome.devtools.protocol");

// existence of chrome.devtools.protocol tested in 
// chrome/src/chrome/test/data/devtools/extensions/devtools_extension/devtools.js

function ProtocolTester() {
}

// Inherit the commands and (empty) default notification handlers

ProtocolTester.prototype = Object.create(chrome.devtools.protocol.Page.prototype);

// Override a notification handler
// https://developers.google.com/chrome-developer-tools/docs/protocol/1.0/page#event-loadEventFired

ProtocolTester.prototype.loadEventFired = function(timestamp) {
  if (typeof timestamp === 'number') { 
    console.log("PASS");
  }
}

var tester = new ProtocolTester();

// Register our listeners
tester.addListeners();

// Fire a command
//https://developers.google.com/chrome-developer-tools/docs/protocol/1.0/page#command-enable

tester.enable(function onEnable() {
    console.log("ProtocolTest enable ", arguments);
    tester.reload(false, undefined, function onReload() {
        console.log("ProtocolTest reload success ", arguments);
    });
});