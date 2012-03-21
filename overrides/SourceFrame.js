// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

/*globals define WebInspector  console */

// Implement WebInspector's SourceFrame using Orion Editor.
// This file will be injected into the WebInspector iframe

define(['OrionEditorEmbedded/editorInserter', 'MetaObject/AJAX'], 
function(                    editorInserter,              AJAX)  {

  /**
   * @extends {WebInspector.View}
   * @constructor
  */

  function SourceFrame(url) {
    // The View is a container element with hide/show operations.
    WebInspector.View.call(this);
    
    this._editor = editorInserter.createEditor(this.element);
    this._openURL(url);
    
    // element property defined and controlled by View
    this.element.addStyleClass("script-view");
    
    this._messages = []; // notifications from console
    this._searchResults = [];
  }

  SourceFrame.Events = {
    Loaded: "loaded"
  };

  SourceFrame.prototype = Object.create(WebInspector.View.prototype);
  
  SourceFrame.prototype._openURL = function(url) {
    AJAX.GET(
      url,
      function(event) {
        var src = event.currentTarget.responseText;
        this._editor.setInput(url, null, src);
        return this;
      }.bind(this),
      function(msg) { 
        console.error('openURL('+url+') FAILS '+msg, msg);
      }
    );
  };
  
    SourceFrame.prototype.setContent = function(mimeType, content) {
      // push content into Orion editor
      this._editor.setText(content);
      // Notify system we are ready
      this._loaded = true;
      this.dispatchEventToListeners(SourceFrame.Events.Loaded);
    };
    //-------------------------------------------------------------------------
    // Panel switching events
    
    /*  See View.show.  willShow(), style visible, wasShown()
    */
    SourceFrame.prototype.willShow = function() {
      console.error("SourceFrame function not implemented");
    };
    
    /* 
    ** Called at the end of View.show(), on all visible children.
    */
    SourceFrame.prototype.wasShown = function() {
      this._editor.getTextView().resize();
    };
    
    /* View method, called only by View._processWillHide
    ** Called during View.detach
    */
    SourceFrame.prototype.willHide = function() {
      console.error("SourceFrame function not implemented");
    };
    
    // Called during View.detach.
    SourceFrame.prototype.wasHidden = function() {
      console.error("SourceFrame function not implemented");
    };
    
    //-------------------------------------------------------------------------
    // Command to take focus
    SourceFrame.prototype.focus = function() {
      console.error("SourceFrame function not implemented");
    };
    
    // Called by Panel. Return StatusBarButton for the button bar across the bottom.
    Object.defineProperty(SourceFrame.prototype, 'statusBarItems', {
        get: function() {
        }
    });
    
    // Called by ScriptsPanel before calling SourceFrame methods
    Object.defineProperty(SourceFrame.prototype, 'loaded', {
        get: function() {
          return this._loaded;
        }
    });

    // Not called by any WebInsepctor code
    SourceFrame.prototype.hasContent = function() {
      return true;
    };
    
    //-------------------------------------------------------------------------
    // Diff
    
    // Called by ResourcesPanel to show diffs created in the editor
    SourceFrame.prototype.markDiff = function(diffData) {
      console.error("SourceFrame function not implemented");
    };
    
    //-------------------------------------------------------------------------
    // Message (on top of source in WebInspector) 

    SourceFrame.prototype.addMessage = function(msg) {
      this._messages.push(msg);
      if (this.loaded) {
        this.addMessageToSource(msg.line - 1, msg);
      } // else we apply the array at load time.
    };
    
    SourceFrame.prototype.clearMessages = function() {
      this._clearMessageMarks();
      this._messages = [];
    };
    
    SourceFrame.prototype.addMessageToSource = function(line, msg) {
      console.error("SourceFrame function not implemented");      
    };
    
    //-------------------------------------------------------------------------
    // Highlights
    SourceFrame.prototype.canHighlightLine = function(line) {
      return true;
    };
    
    SourceFrame.prototype.highlightLine = function(line) {
      console.error("SourceFrame function not implemented");      
    };
    
    //-------------------------------------------------------------------------
    // Search
    SourceFrame.prototype.performSearch = function(query, callback) {
      console.error("SourceFrame function not implemented");      
    };
    
    SourceFrame.prototype.searchCanceled = function() {
      console.error("SourceFrame function not implemented");      
    };
    
    /* @return boolean
    */
    SourceFrame.prototype.hasSearchResults = function() {
    };
    
    // called by ScriptsPanel
    SourceFrame.prototype.jumpToFirstSearchResult = function() {
      this.jumpToSearchResult(0);
    };

    SourceFrame.prototype.jumpToLastSearchResult = function() {
      this.jumpToSearchResult(this._searchResults.length - 1);
    };

    SourceFrame.prototype.jumpToNextSearchResult = function() {
      this.jumpToSearchResult(this._currentSearchResultIndex + 1);
    };

    SourceFrame.prototype.jumpToPreviousSearchResult = function() {
      this.jumpToSearchResult(this._currentSearchResultIndex - 1);
    };

    SourceFrame.prototype.showingFirstSearchResult = function() {
      return this._searchResults.length &&  this._currentSearchResultIndex === 0;
    };

    SourceFrame.prototype.showingLastSearchResult = function() {
      return this._searchResults.length && this._currentSearchResultIndex === (this._searchResults.length - 1);
    };

    Object.defineProperty(SourceFrame.prototype, 'currentSearchResultIndex', {
        get: function() {
          return this._currentSearchResultIndex;
        }
    });

    SourceFrame.prototype.jumpToSearchResult = function(index) {
        if (!this.loaded || !this._searchResults.length) {
            return;
        }
      console.error("SourceFrame function not implemented");      
    };

  return SourceFrame;
});
