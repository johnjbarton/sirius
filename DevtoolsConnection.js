// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

/*global define console window RESTChannel*/


define(['devtoolsAdapter/appendFrame'], 
function(appendFrame)  {

  var debug = true;

  var DevtoolsConnection = {

    openInspector: function(debuggee) {
      this.debuggee = debuggee;
    
      var inspectorElt = this.showInspectorIframe();
      this.listenDebuggee(inspectorElt.contentWindow);
    },
 
    showInspectorIframe: function() {
      var inspectorElt = window.document.getElementById('WebInspector');
      inspectorElt.classList.remove('hide');
      var devtoolsURL = window.SiriusBase + '/atopwi/inspector/front-end/devtools.html';
      return appendFrame('WebInspector', devtoolsURL);
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
  
  return DevtoolsConnection;
});