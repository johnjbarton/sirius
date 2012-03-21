// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

/*globals define console*/

// Writes script tags into a window


define([], function() {

  function injectOne(win, file, thenCall) {
    var element = win.document.createElement('script');
    element.setAttribute('src', file);
    
    function onError() {
      var args = Array.prototype.slice.call(null, arguments);
      console.log("override script load error "+file, args);
    }
    
    function onLoad() {
      console.log("Load complete for "+file);
      element.removeEventListener('load', onLoad, false);
      element.removeEventListener('error', onError, false);
      // implicit loop 
      overrides.injectAll(win, thenCall);
    }
    
    element.addEventListener('load', onLoad, false);
    element.addEventListener('error', onError, false);
    
    win.document.body.appendChild(element);
  }

  var overrides = {
    files: [
     '../../../../MetaObject/q/q.js',  // before require
     '../../../../MetaObject/requirejs/require.js',
     '../../overrides/requireConfig.js',
     '../../overrides/requireOverrides.js'
    ],

    injectAll: function(win, thenCall) {
      var file = this.files.shift();

      if (file) {
        console.log("injecting "+file);
        injectOne(win, file, thenCall);
      } else {
        thenCall();
      }
    }
  };
  
  return overrides;

});