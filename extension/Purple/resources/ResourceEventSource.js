// See Purple/license.txt for Google BSD license
// Copyright 2011 Google, Inc. johnjbarton@johnjbarton.com


(function () {
  var thePurple = window.purple;
  
  var resourceEventSource = new thePurple.PurplePart("ResourceEventSource");
  
  resourceEventSource.connect = function(remote) {
    this.remote = remote;
    
  }
  
  return resourceEventSource;
  
  
}());