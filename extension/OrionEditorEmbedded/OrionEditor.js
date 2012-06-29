/*******************************************************************************
 * Copyright (c) 2010, 2011 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials are made 
 * available under the terms of the Eclipse Public License v1.0 
 * (http://www.eclipse.org/legal/epl-v10.html), and the Eclipse Distribution 
 * License v1.0 (http://www.eclipse.org/org/documents/edl-v10.html). 
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
/*global eclipse:true orion:true define document window require*/
/*jslint devel:true*/

// almost the embeddededitor code

define(['require', 'OrionEditorEmbedded/orionAssembly'], 
function(require,                               orion){

  // Syntax highlighting is triggered by an editor callback 'lineStyle' event
  function ErrorStyler(view) {
    this._onLineStyle = this._onLineStyle.bind(this);
	view.addEventListener("LineStyle", this._onLineStyle);
  }
  
  ErrorStyler.prototype = {
    _onLineStyle: function(e) {
      e.ranges = this._getStyles(e.lineText, e.lineStart);
      return;
    },
    _getStyles: function(text, start) {
      console.log("ErrorStyler called with start: "+start+' text:'+text);
      return [];
      //styles.push({start: tokenStart, end: scanner.getOffset() + offset, style: style});
    }
  };

  // These stylesheets will be inserted into the iframe containing the editor.
  var stylesheets = [
    "orion/textview/textview.css", 
    "orion/textview/rulers.css", 
    "examples/textview/textstyler.css", 
    "examples/editor/htmlStyles.css",
    "examples/editor/embeddededitor.css"];
  // orion.client/bundles/org.eclipse.orion.client.editor/web/
  stylesheets = stylesheets.map(function(sheet) {
    return require.toUrl("orion/"+"../"+sheet);
  });
    
  stylesheets.forEach(function loadCSS(sheetURL) {
    var elt = document.createElement('link');
    elt.setAttribute('rel', 'stylesheet');
    elt.setAttribute('type', 'text/css');
    elt.setAttribute('href', sheetURL);
    document.head.appendChild(elt);
  });
    
  var contentAssistFactory = {
    createContentAssistMode: function(editor) {
      contentAssist = new orion.editor.contentAssist.ContentAssist(editor.getTextView());
      var contentAssistWidget = new orion.editor.contentAssist.ContentAssistWidget(contentAssist, "contentassist");
      return new orion.editor.contentAssist.ContentAssistMode(contentAssist, contentAssistWidget);
    }
  };
  
  
  function save(editor) {
    var url = editor.sourceName;
    var src = editor.getContents();
    RevisionControl.save(url, src);
    editor.setInput(null, null, null, true);
  }
  
  var keyBindingFactory = function(editor, keyModeStack, undoStack, contentAssist) {
    
    // Create keybindings for generic editing
    var genericBindings = new orion.editor.editorFeatures.TextActions(editor, undoStack);
    keyModeStack.push(genericBindings);
    
    // create keybindings for source editing
    var codeBindings = new orion.editor.editorFeatures.SourceCodeActions(editor, undoStack, contentAssist);
    keyModeStack.push(codeBindings);
    
    // save binding
    editor.getTextView().setKeyBinding(new orion.textview.keyBinding.KeyBinding("s", true), "save");
    editor.getTextView().setAction("save", function(){
        save(editor);
        return true;
    });
    
  };
    
  var statusReporter = function(message, isError) {
    if (isError) {
      console.error("Orion editor ERROR:"+message);
    } else {
      console.log("Orion editor: "+message);
    }
  };
  
  var annotationFactory = new orion.editor.editorFeatures.AnnotationFactory();
  
  function OrionEditor(editorElement) {
    var textViewFactory = function() {
      return new orion.textview.textView.TextView({
        parent: editorElement,
        tabSize: 2
      });
    };

    var config = {
      textViewFactory: textViewFactory,
      undoStackFactory: new orion.editor.editorFeatures.UndoFactory(),
      annotationFactory: annotationFactory,
      lineNumberRulerFactory: new orion.editor.editorFeatures.LineNumberRulerFactory(),
      contentAssistFactory: contentAssistFactory,
      keyBindingFactory: keyBindingFactory, 
      statusReporter: statusReporter,
      domNode: editorElement
    };
    
    orion.editor.editor.Editor.call(this, config);
  }

  OrionEditor.prototype = orion.editor.editor.Editor.prototype;

  return OrionEditor;

});