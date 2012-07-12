var layoutTestController = {
  dumpAsText: function() {},
  waitUntilDone: function() {},
  notifyDone: function() {},
  evaluateInWebInspector: function(runTestCallId, toEvaluate) {
    console.log("evaluateInWebInspector "+runTestCallId);
    window.postMessage({evaluateInWebInspector:toEvaluate},  "*");
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