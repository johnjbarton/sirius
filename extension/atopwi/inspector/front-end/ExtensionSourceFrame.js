 // ExtensionSourceFrame  Adapt between devtools and extension editor

  function appendFrame(id, url) {
    var iframe = window.document.createElement('iframe');
    iframe.setAttribute('src', url);
    var elt = id;
    if (!id.ownerDocument) {
      elt = window.document.getElementById(id);
    }
    elt.appendChild(iframe);
    return iframe;
  }



function ExtensionEditorProxy(){};

ExtensionEditorProxy.prototype = {
    
    // API for extension editor: parameters must be things we can send
    // over postMessage
    
    initialize: function(element, onLoad) {
         this.orionFrame = appendFrame(element, '../../../OrionEditorEmbedded/editor.html');
         this.orionFrame.addEventListener('load', onLoad);
         this.orionFrame.setAttribute('style', 'height:100%; width:100%;');
    },
    
    openResource: function(resource) {
       // this.codemirror.setValue(resource.content);
       this.orionFrame.contentWindow.editor.setInput('untitled.js', null, resource.content);
    }

};


function ExtensionSourceFrame(scriptsPanel, uiSourceCode) {
    WebInspector.View.call(this);
    this.element.addStyleClass("script-view");
    
    this.proxy = new ExtensionEditorProxy();
    // ctor?
    this.proxy.initialize(this.element, function() {
        uiSourceCode.requestContent(function() {
            this.proxy.openResource(uiSourceCode.resource());
        }.bind(this));
    }.bind(this));
    

}

ExtensionSourceFrame.prototype = {
    wasShown: function() {
        console.log("wasShown", this);
    },
};


ExtensionSourceFrame.prototype.__proto__ = WebInspector.View.prototype;

