// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

/*global define console window RESTChannel*/


define(['devtoolsAdapter/appendFrame'], 
function(appendFrame)  {

  var debug = true;

  var InspectorPatch = {

    // relative to atopwi/inspector/front-end
    files: [
        window.SiriusBase + '/MetaObject/requirejs/require.js',
        window.SiriusBase + '/RESTChannel/RESTChannel.js',
        '../../devtoolsAdapter/loadDebuggee.js'
      ],

    openInspector: function(debuggee) {
      this.debuggee = debuggee;
    
      var inspectorElt = this.showInspectorIframe();
      this.inspectorWindow = inspectorElt.contentWindow;
  
      // Capture the DOMContentLoaded to add our code
      //
      this.inspectorWindow.addEventListener(
        'DOMContentLoaded', 
        this.patchInspector.bind(this)
      );
      // At this point any async calls from this turn race WebInspector load
    },
 
    showInspectorIframe: function() {
      var inspectorElt = window.document.getElementById('WebInspector');
      inspectorElt.classList.remove('hide');
      return appendFrame('WebInspector', "inspector/front-end/devtools.html");
    },

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
      } else {
        this.listenDebuggee(win);
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
    
    listenDebuggee: function() {
      this.devtools = new RESTChannel.Connection();
      this.onUnload = RESTChannel.listen(
        this.devtools, 
        this.sendDebuggeeSpec.bind(this)
      );
    },
    
    sendDebuggeeSpec: function() {
      this.devtools.putObject(
        'debuggee', 
        this.debuggee,
        function(reply) {
          console.log("atopwi puts debuggee and hears: "+reply.message, reply);
        },
        function(err) {
          console.error("atopwi puts debuggee then err", err);
        }
      );
    }
  };
  
  return InspectorPatch;
});