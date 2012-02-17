atopwi - atop Web Inspector (a-top-wee)

This is the Web Inspector aka Chrome DevTools front end running on crx2app
(https://github.com/johnjbarton/crx2app)

The primary purpose of the atopwi project is to test crx2app. crx2app
is a Chrome extension that uses postMessage RPC to communicate the 
remote debug protocol back to chrome.debugger*
http://code.google.com/chrome/extensions/dev/debugger.html

Requires Chrome 18+

Install:
  clone this repo in a directory you can serve on a web server.
  open atopwi.html in a web browser
  copy the URL for atopwi.html 
  install the crx2app extension
  use the extension 'options' page to allow the atopwi.html URL
  use the extension 'options' page to add the 'Debug with ATopWi' context menu option.
  right click on a page you want to debug.


Some things won't work because the Chrome remote debug protocol is not yet 
completely exposing the capabilities of the socket protocol.
