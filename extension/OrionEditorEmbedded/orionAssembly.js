// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2012 Google, Inc. johnjbarton@chromium.org

/*globals define*/

define([
  "MetaObject/MetaObject",
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
  MetaObject,
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

  var orion = MetaObject.extend({
  });
   
  orion.textview = orion.mergeMethods(
    orion_textview_eventTarget,
    orion_textview_keyBinding,
    orion_textview_annotations,
    orion_textview_textModel,
    orion_textview_projectionTextModel,
    orion_textview_textView, 
    orion_textview_undoStack,
    orion_textview_rulers
  );
  
  orion.editor = orion.mergeMethods(
    orion_editor_editorFeatures,
    orion_editor_htmlGrammar,
    orion_editor_contentAssist,  
    orion_editor_jsContentAssist,
    orion_editor_cssContentAssist,
    orion_editor_editor,
    orion_editor_editorFeatures
  );

  return orion;

});