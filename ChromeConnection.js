// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

/*globals chromeExtensionPipe window console Q require define */

define(['q/q', 'appendFrame', 'openInspector'], 
function(  Q,   appendFrame,   openInspector)  {

  var debug = false;

  // Base URL for crx2app

  // stand alone crx2app
  // var iframeDomain ="chrome-extension://bbjpappmojnmallpnfgfkjmjnhhplgog";
  // Sirius crx2app
  var iframeDomain = window.crx2appBase = 'chrome-extension://fkhgelnmojgnpahkeemhnbjndeeocehc/crx2app/extension';

  var connection = chromeExtensionPipe.createFrom(iframeDomain);

  window.beforeUnloadQueue = [];

  window.onbeforeunload = function runQueue() {
    window.beforeUnloadQueue.forEach(function(fnc) {
      fnc();
    });
  };

  window.beforeUnloadQueue.push(function detach() {
    connection.detach();
  });

  function promiseNewTabId(url, chromeProxy) {
    var deferred = Q.defer();
    var win = chromeProxy.promiseNewWindow();
    Q.when(win, function(win) {
      var tabId = win.tabs[0].id;
      if (debug) {
        console.log('atopwi promiseNewTabId '+tabId);
      }
      deferred.resolve(tabId);
    });
    return deferred.promise;
  }

  function promiseDebuggee(debuggee, chromeProxy) {
    var deferred = Q.defer();
    if ( debuggee.url ) {  
      var newTabId = promiseNewTabId(debuggee.url, chromeProxy);
       Q.when(newTabId, function(newTabId) {
         debuggee.tabId = newTabId;
         window.beforeUnloadQueue.push(function() {
           chromeProxy.tabs.remove(newTabId);
           // stopping in the debugger is the only way I can 
           // get the window to close
           debugger;  
         });
         deferred.resolve(debuggee);
       }, console.error).end();
    } else {
      deferred.resolve(debuggee);
    }
    return deferred.promise;
  }

  function parseDebuggee(debuggeeSpec) {
    var debuggee = {};
    var tabId = parseInt(debuggeeSpec.tabId, 10);
    if ( isNaN(tabId) ) {  // then we better have a URL
      debuggee.url = decodeURIComponent(debuggeeSpec.url);
    } else {
      debuggee.tabId = tabId;
    }
    return debuggee;
  }

  function openDebuggee(debuggeeSpec) {
    // dynamically load the chrome proxy
    require({
      paths: {
        'crx2app': 'lib/crx2app/extension'
      }
    }); 
    require.onError = function(err) {
      console.error(err+'', {stack: err.stack.split('\n')});
    };

    require(['crx2app/rpc/ChromeProxy'], function open(ChromeProxy) {
      var chromeProxy = ChromeProxy.new(connection, {windows: {}, tabs: {}});
      var debuggee = parseDebuggee(debuggeeSpec);
      debuggee = promiseDebuggee(debuggee, chromeProxy);
      Q.when(debuggee, function(debuggee) {
        chromeProxy.debugger.attach({tabId: debuggee.tabId}, '1.0', function() {
          if (debug) {
            console.log('atopwi chrome.debugger.attach complete '+debuggee.tabId);
          }
         
          window.beforeUnloadQueue.unshift(function() {
            chromeProxy.debugger.detach({tabId: debuggee.tabId});
          });
         
          var inspectorReady = openInspector(debuggee, chromeProxy);
          Q.when(inspectorReady, function(inspectorReady) {
            if (debuggee.url) {
              if (debug) {
                console.log('atopwi setting URL:'+debuggee.url);
              }
              chromeProxy.tabs.update(
                debuggee.tabId, 
                {url: debuggee.url}, 
                function(tab) {
                  if (debug) {
                    var msg = 'atopwi.chrome.tabs.update ' + debuggee.tabId;
                    msg += ' to ' + debuggee.url;
                    console.log(msg);
                  }
                }
              );
            }
          });
        });
       
      }).end();
    });
  }  

  function attach(debuggeeSpec) {

    var tid = window.setTimeout(function offerExtension() {
      // TODO
      window.alert('Requires: https://github.com/johnjbarton/crx2app');
    }, 2000);
  
    // listen for a connection.
    connection.attach(function onConnectedToChrome() {
      // we have connected to the extension, so clear the offer
      window.clearTimeout(tid);
    
      openDebuggee(debuggeeSpec);
    
    }, function errback(msg) {
      var div = window.document.querySelector('#error');
      div.innerHTML = msg;
    });
  
    // dynamically load the chromeIframe, it will connect and fire the callback
    // (if we load the iframe statically, 
    // this outer load event will come *after* the iframe load event.)
    appendFrame('loadChromeIframe', iframeDomain + '/appEnd/chromeIframe.html');
  }

  return {
    attach: attach
  };

});