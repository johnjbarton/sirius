// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google, Inc. johnjbarton@johnjbarton.com

/*globals window define*/

define([], function () {

function extractParametersFromWindow() {
  var search = window.location.search;
  if (search) {
    var parameterString = search.substr(1);
    if (parameterString) {
      var params = {};
      parameterString.split('&').forEach(function(param) {
        var nv = param.split('=');
        if (nv.length === 2 && nv[1]) {
          params[nv[0]] = nv[1];
        }
      });
      if (Object.keys(params).length) {
        return params;
      }
    }
  } // else undefined
}

return {
  extractParametersFromWindow: extractParametersFromWindow
};

});