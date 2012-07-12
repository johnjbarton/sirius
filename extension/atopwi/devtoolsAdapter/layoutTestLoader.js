var layoutTestLoader = {
  
  onMessage: function(details, sender, sendResponse) {
    var method = details.method;
    if (method) {
      sendResponse(
        this[method].apply(this, details.arguments)
      );
    }
  },
  
  getTestList: function() {
    return [];
  },

  fireDevtoolsTest: function(scriptURL) {
    var elt = document.createElement('script');
    elt.src = scriptURL;
    document.body.appendChild(elt);
    return true;
  },

  onWindowMessage: function(event) {
    console.log("onWindowMessage " + (window===event.source)?"go":"fail", event);
    chrome.extension.sendMessage(event.data, function(response) {
      console.log("onWindowMessage sendMessage response ", response);
    })
  },

  addListeners: function() {
    chrome.extension.onMessage.addListener(this.onMessage.bind(this));
    window.addEventListener('message', this.onWindowMessage.bind(this));
    console.log("addListener ready");  
  }
};

layoutTestLoader.addListeners();

