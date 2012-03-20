// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

/*globals define WebInspector */

// Implement WebInspector's JavaScriptSourceFrame using Orion Editor

define(['overrides/SourceFrame'], 
function(          SourceFrame)  {

  function JavaScriptSourceFrame(scriptPanel, model, uiSourceCode) {
    // We also override SourceFrame
    SourceFrame.call(this, uiSourceCode.url);

    this._uiSourceCode = uiSourceCode;
    this._uiSourceCode.addEventListener(WebInspector.UISourceCode.Events.ContentChanged, this._onContentChanged, this);

  }
  
  JavaScriptSourceFrame.prototype = {
  
    // Called when the DebuggerPresentationModel sees a changed source
    _onContentChanged: function() {
      this._uiSourceCode.requestContent(this.setContent.bind(this));
    }
  };

  return JavaScriptSourceFrame;
});
