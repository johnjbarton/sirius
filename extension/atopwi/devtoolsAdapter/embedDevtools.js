// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

/*global define console window RESTChannel*/

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
        console.log('WebInspector patched at load event');
      };
      this.insertScripts(win);
    },
    
    // Recurse by chaining off the load event, 
    // then wait for the connection event
    insertScripts: function(win) {
      if(this.files.length) {
        this.insertScript(this.files.shift(), win);
      }
    },
    
    insertScript: function(file, win) {
      var element = win.document.createElement('script');
      element.setAttribute('src', file);
    
      function onError() {
        var args = Array.prototype.slice.call(arguments, 0);
        console.log("override script load error "+file, args);
      }
    
      function onLoad() {
        console.log("Load complete for "+file);
        element.removeEventListener('load', onLoad, false);
        element.removeEventListener('error', onError, false);
        // Recurse
        this.insertScripts(win);  
      }
    
      element.addEventListener('load', onLoad.bind(this), false);
      element.addEventListener('error', onError, false);
    
      win.document.body.appendChild(element);
    },
  };

  window.addEventListener(
     'DOMContentLoaded', 
      InspectorPatch.patchInspector.bind(InspectorPatch)
  );
    
}());