44// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2012 Google, Inc. johnjbarton@chromium.org

/*globals define*/

define([
  "orion/textview/eventTarget",
  "orion/textview/keyBinding",
  "orion/textview/annotations", 
  "orion/textview/textModel",
  "orion/textview/projectionTextModel", 
  "orion/textview/textView", 
  "orion/textview/tooltip", 
  "orion/textview/rulers",
  "orion/textview/undoStack",
  "orion/editor/htmlGrammar",
  "orion/editor/contentAssist",
  "orion/editor/jsContentAssist",
  "orion/editor/cssContentAssist",
  "orion/editor/editor",
  "orion/editor/editorFeatures"
], function(
  orion_textview_eventTarget,
  orion_textview_keyBinding,
  orion_textview_annotations, 
  orion_textview_textModel,
  orion_textview_projectionTextModel, 
  orion_textview_textView, 
  orion_textview_tooltip, 
  orion_textview_rulers,
  orion_textview_undoStack,
  orion_editor_htmlGrammar,
  orion_editor_contentAssist,
  orion_editor_jsContentAssist,
  orion_editor_cssContentAssist,
  orion_editor_editor,
  orion_editor_editorFeatures
) {

  var orion = {};
  
  orion.textview = {
    eventTarget: orion_textview_eventTarget,
    keyBinding: orion_textview_keyBinding,
    annotations: orion_textview_annotations,
    textModel: orion_textview_textModel,
    projectionTextModel: orion_textview_projectionTextModel,
    textView: orion_textview_textView, 
    undoStack: orion_textview_undoStack,
    rulers: orion_textview_rulers
  };
    
  
  orion.editor = {
    editorFeatures: orion_editor_editorFeatures,
    htmlGrammar: orion_editor_htmlGrammar,
    contentAssist: orion_editor_contentAssist,  
    jsContentAssist: orion_editor_jsContentAssist,
    cssContentAssist: orion_editor_cssContentAssist,
    editor: orion_editor_editor,
    editorFeatures: orion_editor_editorFeatures
  };

  return orion;

});