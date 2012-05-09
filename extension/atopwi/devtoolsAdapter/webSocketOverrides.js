// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

// Content script for atopwi pages to rewrite websocket links from localhost:9222 to atopwi server

/*global window */

function rewriteURLs() {
  chrome.extension.sendRequest({message: "redirectDevtools", parentFrame: window.location.toString()});
}

function awaitContent() {
  if (window.document.querySelectorAll('.WebSocketSelector iframe').length > 0) {
    rewriteURLs(); 
  } else {
    window.setTimeout(awaitContent, 100);
  }
}

awaitContent();
