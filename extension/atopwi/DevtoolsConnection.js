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
      console.log("append WebInspector from "+this.debuggee.devtoolsURL);
      return appendFrame('WebInspector', this.debuggee.devtoolsURL);
    },

    listenDebuggee: function() {
      if (debug) {
        console.log("DevtoolsConnection listening ");
      }
      this.onUnload = RESTChannel.listen(
        window, 
        this._onConnect.bind(this)
      );
    },
    
    _onConnect: function(connection) {
      this.devtools = connection;
      this.sendDebuggeeSpec();
    },
    
    sendDebuggeeSpec: function() {
      this.devtools.putObject(
        'debuggee', 
        this.debuggee,
        function(reply) {
          console.log("atopwi puts debuggee %o and hears: "+reply.message, this.debuggee, reply);
        }.bind(this),
        function(err) {
          console.error("atopwi puts debuggee then err", err);
        }
      );
    },
    
  };
  
  return DevtoolsConnection;
});