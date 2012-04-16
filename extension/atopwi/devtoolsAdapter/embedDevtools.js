// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

/*global define console window ScriptInjector*/

// requires ScriptInjector

(function()  {

  var debug = true;
  
  var InspectorPatch = {

    // relative to atopwi/inspector/front-end
    files: [
       '../../../MetaObject/requirejs/require.js',
       '../../../RESTChannel/RESTChannel.js',
       '../../../crx2app/extension/appEnd/appEnd.js',
        '../../devtoolsAdapter/loadDebuggee.js'
      ],

    patchInspector: function(event) {
      var win = event.currentTarget;
      win.WebInspector.delayLoaded = win.WebInspector.loaded;
      win.WebInspector.loaded = function() {
        if (debug) {
          console.log('WebInspector patched at load event');
        }
      };
      ScriptInjector.injectScripts(this.files, win);
    }
  };
    
  window.addEventListener(
     'DOMContentLoaded', 
      InspectorPatch.patchInspector.bind(InspectorPatch)
  );
    
}());