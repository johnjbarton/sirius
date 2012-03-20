// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

/*globals define WebInspector  */

// Implement WebInspector's SourceFrame using Orion Editor.
// This file will be injected into the WebInspector iframe

define([], function()  {

  /**
   * @extends {WebInspector.View}
   * @constructor
  */

  function SourceFrame(url) {
    // The View is a container element with hide/show operations.
    WebInspector.View.call(this);
    
    // element property defined and controlled by View
    this.element.addStyleClass("script-view");

  }

  SourceFrame.Events = {
    Loaded: "loaded"
  };

  SourceFrame.prototype = {
    setContent: function(mimeType, content) {
      // push content into Orion editor
      
      // Notify system we are ready
      this.dispatchEventToListeners(SourceFrame.Events.Loaded);
    }

  };

  return SourceFrame;
});
