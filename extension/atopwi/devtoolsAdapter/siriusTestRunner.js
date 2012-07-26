// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

var channel;

var testRunner = {
  dumpAsText: function() {
      console.log("testRunner: ignored dumpAsText");
  },
  waitUntilDone: function() {
      console.log("testRunner: ignored waitUntilDone");
  },
  closeWebInspector: function() {
      console.log("testRunner: ignored closeWebInspector");
  },
  notifyDone: function(message) {
      window.postMessage({method: 'notifyDone', arguments: [message]}, "*");
  },
  evaluateInWebInspector: function(runTestCallId, toEvaluate) {
    console.log("evaluateInWebInspector sending to content script, id "+runTestCallId);
    channel.postMessage({method: 'evaluateInWebInspector', arguments:[toEvaluate]},  "*");
  },
  onMessage: function(message) {
    console.log("testRunner.onMessage %o", message);
  }
};

channel = new ChannelPlate.WebPage(testRunner.onMessage);
  
// InspectorTest calls all functions named "initialize_*" before running tests
function initialize_sirius() {
  // Override 
  InspectorTest.runExtensionTests = function() {
    RuntimeAgent.evaluate("location.href", "console", false, function(error, result) {
      if (error)
         return;
      var pageURL = result.value;
      console.log("pageURL "+pageURL);
      var extensionURL = 
        pageURL.replace(/^(https?:\/\/[^/]*\/).*$/,"$1") +
            "devtoolsAdapter/extension-main.html";
        WebInspector.addExtensions([{ startPage: extensionURL, name: "test extension", exposeWebInspectorNamespace: true }]);
    });              
  }
  console.log("initialize_sirius");
}

runTest();