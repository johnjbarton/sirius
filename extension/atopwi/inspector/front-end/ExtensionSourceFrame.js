 // ExtensionSourceFrame  Adapt between devtools and extension editor

function ExtensionEditorProxy(){};

ExtensionEditorProxy.prototype = {
    
    // API for extension editor: parameters must be things we can send
    // over postMessage
    
    initialize: function(element) {
         this.codemirror = new CodeMirror(element, {
            value: '',
            mode: 'javascript',
            lineNumbers: true,
            lineWrapping: true
        });
    },
    
    openResource: function(resource) {
       this.codemirror.setValue(resource.content);
    },

};

function ExtensionSourceFrame(scriptsPanel, uiSourceCode) {
    WebInspector.View.call(this);
    this.element.addStyleClass("script-view");
    
    this.proxy = new ExtensionEditorProxy();
    // ctor?
    this.proxy.initialize(this.element);
    
    uiSourceCode.requestContent(function() {
        this.proxy.openResource(uiSourceCode.resource());
    }.bind(this));

}

ExtensionSourceFrame.prototype = {
    wasShown: function() {
        console.log("wasShown", this);
    },
};


ExtensionSourceFrame.prototype.__proto__ = WebInspector.View.prototype;

