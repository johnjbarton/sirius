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

  addListener: function() {
    chrome.extension.onMessage.addListener(this.onMessage.bind(this));
    console.log("addListener ready");  
  }
};

layoutTestLoader.addListener();

