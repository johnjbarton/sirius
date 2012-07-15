var layoutTestLoader = {
  
  onMessageFromDevTools: function(details, sender, sendResponse) {
    var method = details.method;
    if (method) {
      sendResponse(
        this[method].apply(this, details.arguments)
      );
    }
  },
  
  loadLayoutTestController: function(scriptURL) {
    var elt = document.createElement('script');
    elt.src = scriptURL;
    document.body.appendChild(elt);
    return true;
  },

   //--------------------------------------------------------------------- 

  onWindowMessage: function(event) {
    console.log("onWindowMessage " + (window===event.source)?"go":"fail", event);
    chrome.extension.sendMessage(event.data, function(response) {
      console.log("onWindowMessage sendMessage response ", response);
    })
  },

  addListeners: function() {
    chrome.extension.onMessage.addListener(this.onMessageFromDevTools.bind(this));
    window.addEventListener('message', this.onWindowMessage.bind(this));
    console.log("addListeners complete");  
  }
};

layoutTestLoader.addListeners();

// At the of this script we will attempt to runTests()
var controllerURL = "chrome-extension://fkhgelnmojgnpahkeemhnbjndeeocehc/atopwi/devtoolsAdapter/layoutTestController.js"
layoutTestLoader.loadLayoutTestController(controllerURL);
console.log("loaded "+controllerURL);
