// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

/*globals chrome console window require */

  var debug = false;

  var options = restoreOptions();
  if (!options) {  // maybe our first time
    console.log("no options set"); 
    options = {
      allowedSites: [
        {
          name: 'Sirius',
          site: 'chrome-extension://fkhgelnmojgnpahkeemhnbjndeeocehc/atopwi/atopwi.html'
        }
      ]
    };
    var stringified = JSON.stringify(options);
    window.localStorage.setItem('options', stringified);
  }


//--------------------------------------------------------------------------
// Watch for devtools to load then inject our communications endpoints



//--------------------------------------------------------------------------
// Build list of Orion edit headers as the headers arrive

      var editableByTabId = {};
      var editSubString = "/edit/edit.html#";

      function checkForEditHeader(details) {

        var url = details.url;
        var tabId = details.tabId;
        
        if(debug) {
          console.log("checkForEditHeader "+url+" in "+tabId);
        }
        
        var editParameters = {};
        var headers = details.responseHeaders;
        headers.forEach(function findOrion(header) {
          if (header.name === "X-Edit-Server") {
            editParameters.server = header.value;
          } else if (header.name === "X-Edit-Token") {
            editParameters.token = header.value;
          }
        });
        
        if (editParameters.server && editParameters.token) {
          var editURL = editParameters.server + editParameters.token;
          if (!editableByTabId[tabId]) {
            editableByTabId[tabId] = [];
          }
          editableByTabId[tabId].push({url: url, editURL: editURL, tabId: tabId});
        }
      }
      
      chrome.webRequest.onCompleted.addListener(
         checkForEditHeader, 
         // main_frame for page action; script and stylesheet for devtools
         {urls: ["*://*/*"], types: ['main_frame', 'script', 'stylesheet']}, 
         ['responseHeaders']
       );
       
//-------------------------------------------------------------------------------
// Page Actions

      function openAsFilePageAction(url, tabId) {
        var ndx = url.indexOf(editSubString);
        if (ndx > 0) {
          chrome.pageAction.show(tabId);
          chrome.pageAction.setTitle({tabId: tabId, title: "Open As File"});
          return true;
        }
      }

      function openInOrionEditor(url, tabId) {   
        var editableTabIds = Object.keys(editableByTabId);
        editableTabIds.forEach(function(tabIdName) {
          var tabId = parseInt(tabIdName, 10);
           if(tabId) {
             chrome.pageAction.show(tabId);
             chrome.pageAction.setTitle({tabId: tabId, title: "Open In Orion Editor"});
             return true;
           }
        });
      }

      function runDevtoolsTest(url, tabId) {
        var ndx = url.indexOf(':9696');
        if (ndx > 0) {
          chrome.pageAction.show(tabId);
          chrome.pageAction.setTitle({tabId: tabId, title: "run devtools test"});
        }
      }

      function checkForPageAction(url, tabId) {
        return openAsFilePageAction(url, tabId) || 
               openInOrionEditor(url, tabId) ||
               runDevtoolsTest(url, tabId);
      }
   
      function reportListeners(where, like) {
        console.log(where+" has:"+chrome.webNavigation.onBeforeNavigate.hasListener(like)+" total: "+
        chrome.webNavigation.onBeforeNavigate.listeners_.length);
      }


//--------------------------------------------------------------------------
// Add Page Action onUpdated tab

      function onTabUpdated(tabId, changeInfo, tab) {
        checkForPageAction(tab.url, tab.id);
      }

      chrome.tabs.onUpdated.addListener(onTabUpdated);

      function onTabRemoved(tabId, removeInfo) {
        delete editableByTabId[tabId];
      }
       
      chrome.tabs.onRemoved.addListener(onTabRemoved);

//-----------------------------------------------------------------------------
// Open editor or file on page action click

      function pageAction(tab) {
        var editables = editableByTabId[tab.id];
        if (editables) {
          editables.forEach(function(editable) {
            if (editable.url === tab.url) {
              chrome.tabs.create({url: editable.editURL});
            }
          });
        } else {
          var ndx = tab.url.indexOf(editSubString);
          if (ndx > 0) {
            var fileURL = tab.url.substr(0, ndx);
            fileURL += tab.url.substr(ndx + editSubString.length);
            chrome.tabs.create({url: fileURL}, function(tab) {
              console.log("opened "+fileURL+" in ", tab);
            });
          } else {
            runDevtoolsTest();
          }
        }
      }
      chrome.pageAction.onClicked.addListener(pageAction);

//------------------------------------------------------------------------------
// run devtools testing on page Action
function runDevtoolsTest() {
  // notify our content-script to load the layoutTestController
  // That will trigger the tests
}

//------------------------------------------------------------------------------
// SuperLogin: reload all Orion pages after logging in.
  var debugRequests = true;

  function superLogin(request, sender, sendResponse) {
        sendResponse({farewell: "goodbye"});
        var host = sender.tab.url.split('/').slice(0,3).join('/');
        var tabs = [];
        chrome.windows.getAll({populate: true}, function(wins) {
          wins.forEach(function(win) {
            win.tabs.forEach(function(tab) {
              if (tab.url.indexOf(host) === 0 && tab.url !== sender.tab.url) {
                tabs.push(tab);
              }
            });
          });
          var msg = "Reload "+tabs.length+" Orion pages?";
          if (window.confirm(msg)) {
            if (debugRequests) {
              console.log("need to reload ", tabs);
            }
            tabs.forEach(function(tab) {
              chrome.tabs.reload(tab.id, {}, function() {
                if (chrome.extension.lastError) {
                  console.error("Reload failed for "+tab.url+" "+chrome.extension.lastError);
                } else {
                  if (debugRequests) {
                    console.log("Reloaded "+tab.url);
                  }
                }
              });
            });
          }
        });
  }


//------------------------------------------------------------------------------
// Save from DevTools to Orion

require(['orion/sirius'], function(sirius) {

  function getMatchingEditable(url) {
    var matchingEditable;
    var editableTabIds = Object.keys(editableByTabId);
    editableTabIds.forEach(function(tabId) {
      var editables = editableByTabId[tabId];
      editables.forEach(function(editable) {
        if (editable.url === url) {
          matchingEditable = editable;
        }
      });
    });
    return matchingEditable;
  }

  function saveResource(request, sender, sendResponse) {
    if (debug) {
      console.log("background.saveResource", request);
    }

    var onErr = console.error.bind(console, "sirius.saveResource ERROR for "+request.url);
    var onSaved = console.info.bind(console, "sirius.saveResource DONE for "+request.url);

    var editURL;
    var matchingEditable = getMatchingEditable(request.url);
    if (matchingEditable) { 
      // we know the URL Orion would use to edit this same file
      editURL = matchingEditable.editURL; 
    }
  
    sirius.save(request.url, request.content, editURL, onSaved, onErr);
  }

  function redirectDevtools(request, sender, sendResponse) {
    console.log("redirectDevTools ", sender.tab.url);
    var filter = {
      urls: ['http://localhost:9222/*'], // when devtools is requested and
      tabId: sender.tab.id               // when the atopwi tab starts the request
    };
    function grabParams(details) {
      console.log('grabParams ', details.url);
      var params = details.url.split('?')[1];
      if (params) {
        chrome.tabs.update(sender.tab.id, {url: sender.tab.url + '?' + params});
      }
      chrome.webRequest.onBeforeRequest.removeListener(grabParams); 
    }
    chrome.webRequest.onBeforeRequest.addListener(
      grabParams, 
      filter, 
      ['blocking']
    );
  }

  chrome.extension.onRequest.addListener(
    function dispatch(request, sender, sendResponse) {
      if (request.orion === "loginUnloading") {
        // built into Orion now superLogin(request, sender, sendResponse);
      } else if (request.message === "saveResource") {
        saveResource(request, sender, sendResponse);
      } else if (request.message === "redirectDevtools") {
        redirectDevtools(request, sender, sendResponse);
      } 
    }
  );
});  

