// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

// Content script for atopwi pages to rewrite websocket linsk from localhost:9222 to atopwi server

/*global window */

function rewriteURLs() {
  window.alert('rewriteURLs');
}

function onLoad() {
  window.removeEventListener('load', onLoad);
  window.setTimeout(rewriteURLs);
}

if (window.location.toString().indexOf('localhost:9222')) {
  window.addEventListener('load', onLoad);
}