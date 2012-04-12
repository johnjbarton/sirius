// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

/*global define console window RESTChannel*/


define(['devtoolsAdapter/appendFrame'], 
function(appendFrame)  {

  var debug = true;

  var DevtoolsConnection = {

    openInspector: function(debuggee) {
      this.debuggee = debuggee;
    
      this.listenDebuggee();
      this.showInspectorIframe();
    },
 
    showInspectorIframe: function() {
      var inspectorElt = window.document.getElementById('WebInspector');
      inspectorElt.classList.remove('hide');
      var devtoolsURL = window.SiriusBase + '/atopwi/inspector/front-end/devtools.html';
      return appendFrame('WebInspector', devtoolsURL);
    },

    listenDebuggee: function() {
      if (debug) {
        console.log("DevtoolsConnection listening ");
      }
      this.onUnload = RESTChannel.listen(
        window, 
        this.sendDebuggeeSpec.bind(this)
      );
    },
    
    sendDebuggeeSpec: function(connection) {
      this.devtools = connection;
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
  
  return DevtoolsConnection;
});