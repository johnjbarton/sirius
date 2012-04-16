// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

/*global define console window ScriptInjector*/

// requires ScriptInjector

(function()  {

    // relative to atopwi/inspector/front-end
    var paths = [
       '../atopwi/inspector/front-end/ExtensionAPI.js',
       '../../RESTChannel/RESTChannel.js',
       '../atopwi/APIGeneration/trialAPI.js',
       '../atopwi/devtoolsAdapter/extensionPanelRuntime.js'
      ];

    paths = paths.map(function(path) {
      return chrome.extension.getURL(path);
    });

   ScriptInjector.injectScripts(paths, window);
    
}());