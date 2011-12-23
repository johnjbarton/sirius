// Content Script for reloading pages on login
// Loaded into pages with URL "matches": "http://*/mixloginstatic/LoginWindow.html*",

window.onbeforeunload = function onUnload(event) {
  chrome.extension.sendRequest({orion: "loginUnloading"}, function(response) {
	  console.log("superLogin.js: ", response);
  });  
};