/*globals console chrome */
function testLowLevel() {

  // existence of chrome.devtools.remoteDebug tested in 
  // chrome/src/chrome/test/data/devtools/extensions/devtools_extension/devtools.js

  console.log("Testing Low-level API: chrome.devtools.remoteDebug");

  var domainListener = {
    loadEventFired: function(timestamp) {
      if (typeof timestamp === 'number') {
        console.log('PASS low-level event');
      } else {
        console.error('FAIL wrong argument to loadEventFired');
      }
      chrome.devtools.remoteDebug.removeDomainListener('Page', domainListener);
      testHighLevel();
    }
  };

  chrome.devtools.remoteDebug.registerEvent('Page.loadEventFired', ['timestamp']);
  chrome.devtools.remoteDebug.addDomainListener('Page', domainListener);
  
  chrome.devtools.remoteDebug.sendCommand('Page.reload', {}, function(result) {
      console.log('PASS low-level sendCommand');
  });

}

function testHighLevel() {

  console.log("Testing High-level API: chrome.devtools.protocol");

  function ProtocolTester() {
  }

  // Inherit the commands and (empty) default notification handlers

  ProtocolTester.prototype = Object.create(chrome.devtools.protocol.Page.prototype);

  // Override a notification handler
  // https://developers.google.com/chrome-developer-tools/docs/protocol/1.0/page#event-loadEventFired

  ProtocolTester.prototype.loadEventFired = function(timestamp) {
    if (typeof timestamp === 'number') { 
      console.log("PASS high-level event");
    }
  };

  var tester = new ProtocolTester();

  // Register our listeners
  tester.addListeners();

  // Fire a command
  //https://developers.google.com/chrome-developer-tools/docs/protocol/1.0/page#command-enable

  tester.enable(function onEnable() {
      console.log("ProtocolTest enable ", arguments);
      tester.reload(false, undefined, function onReload() {
          console.log("PASS high-level command", arguments);
      });
  });
  
}

testLowLevel();