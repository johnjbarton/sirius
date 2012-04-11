// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

/*global define console window ScriptInjector*/

// requires ScriptInjector

(function()  {

    // relative to atopwi/inspector/front-end
    var files = [
       '../inspector/front-end/ExtensionAPI.js',
       '../../RESTChannel/RESTChannel.js',
       '../APIGeneration/trialAPI.js',
       '../devtoolsAdapter/extensionPanelRuntime.js'
      ];

   ScriptInjector.injectScripts(files, window);
    
}());