// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

/*global define chrome window console*/

define(['../orion/AJAX','../lib/q/q'], function(AJAX, Q) {


var sirius = {
  debug: false,
  
  promiseOpenEditorTabs: function (editURL) {
    var deferred = Q.defer();
    var orionEditorTabs = [];
    chrome.tabs.query({}, function(tabs) {
      // sadly query will not match a URL, must do it by hand
      tabs.forEach(function(tab) {
        if (tab.url === editURL) {
          orionEditorTabs.push(tab);
        }
      });
      deferred.resolve(orionEditorTabs);
    });
    return deferred.promise;
  },
    
  save: function(url, content, editURL, callback, errback) {
    var openEditors = this.promiseOpenEditorTabs(editURL);
    return Q.when(openEditors, function(openEditors) {
      var abortSave = false;
      openEditors.forEach(function(tab) {
        if (tab.title[0] === "*") {
          abortSave = true;
          chrome.tabs.update(tab.id, {highlighted:true, active:true}, function(tab) {
            chrome.experimental.infobars.show({tabId: tab.id, path: "orion/saveConflict.html", height:24}, function (win) {
              if (chrome.extension.lastError) {
                console.error("Sirius: Error in attempt to warn about save-conflict: "+chrome.extension.lastError);
              } else {
                console.log("Sirius: Warned about save-conflict on tab "+tab.id+" with "+editURL);
              }
            });
          });
        } // else reload below
      });
      if (!abortSave) { 
        AJAX.save(url, content, callback, errback);
        if (this.debug) {
          console.log("sirius.savedResource "+url);
        }
        openEditors.forEach(function (tab) {
          chrome.tabs.reload(tab.id, {}, function() {
            if (chrome.extension.lastError) {
              console.error("sirius.save reload ERROR: "+chrome.extension.lastError);
            }
          });
        });
      }
    });
  }
};

return sirius;

});