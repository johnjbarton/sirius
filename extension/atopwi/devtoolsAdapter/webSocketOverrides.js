// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

// Content script for atopwi pages to rewrite websocket links from localhost:9222 to atopwi server

/*global window */

function rewriteURLs() {
  chrome.extension.sendRequest({message: "redirectDevtools", parentFrame: window.location.toString()});
}

function awaitContent() {
  var selector = window.document.querySelector('.WebSocketSelector');
  if (selector.getBoundingClientRect().height) {
    if (selector.querySelectorAll('iframe').length > 0) {
      rewriteURLs(); 
    } else {
      window.setTimeout(awaitContent, 100);
    }
  }
}

awaitContent();
