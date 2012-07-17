var layoutTestController = {
  dumpAsText: function() {
      console.log("layoutTestController: ignored dumpAsText");
  },
  waitUntilDone: function() {
      console.log("layoutTestController: ignored waitUntilDone");
  },
  closeWebInspector: function() {
      console.log("layoutTestController: ignored closeWebInspector");
  },
  notifyDone: function(message) {
      window.postMessage({method: 'notifyDone', arguments: [message]}, "*");
  },
  evaluateInWebInspector: function(runTestCallId, toEvaluate) {
    console.log("evaluateInWebInspector sending to content script, id "+runTestCallId);
    window.postMessage({method: 'evaluateInWebInspector', arguments:[toEvaluate]},  "*");
  }
};
  
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