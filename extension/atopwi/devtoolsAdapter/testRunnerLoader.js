var testRunnerLoader = {
  
  // At the of this script we will attempt to runTests()
  controllerURL: "chrome-extension://fkhgelnmojgnpahkeemhnbjndeeocehc/atopwi/devtoolsAdapter/testRunner.js",
   
  devToolsResponder: {
    runTest: function() {
      testRunnerLoader._loadtestRunner(testRunnerLoader.controllerURL);
      console.log("loaded "+testRunnerLoader.controllerURL);
    }
  },
  
  onMessageFromDevTools: function(details, sender, sendResponse) {
    console.log("testRunnerLoader.onMessageFromDevTools sender %o details: %o",sender, details);
    var method = details.method;
    if (method && this.devToolsResponder[method]) {
      sendResponse(
        this.devToolsResponder[method].apply(this, details.arguments)
      );
    } else {
      if(method)
        console.error("testRunnerLoader.onMessageFromDevTools no "+ method + " in ", devToolsResponder);
    }
  },

  //--------------------------------------------------------------------- 
  
  _loadtestRunner: function(scriptURL) {
    var elt = document.createElement('script');
    elt.src = scriptURL;
    document.body.appendChild(elt);
    return true;
  },

  //--------------------------------------------------------------------- 

  onWindowMessage: function(event) {
    console.log("testRunnerLoader.onWindowMessage "+event.data.method, event);
    chrome.extension.sendMessage(event.data, function(response) {
      if (chrome.extension.lastError) {
          console.error("testRunnerLoader failed to send to background:" + chrome.extension.lastError.message);
          return;
      }
      console.log("testRunnerLoader.onWindowMessage " + event.data.method +", sendMessage response ", response);
    })
  },

  addListeners: function() {
    chrome.extension.onMessage.addListener(this.onMessageFromDevTools.bind(this));
    window.addEventListener('message', this.onWindowMessage.bind(this));
    console.log("addListeners complete");  
  }
};

testRunnerLoader.addListeners();


