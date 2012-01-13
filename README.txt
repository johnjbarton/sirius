atopwi - atop Web Inspector (a-top-wee)

This is the Web Inspector aka Chrome DevTools front end running on crx2app
(https://github.com/johnjbarton/crx2app)

The primary purpose of the atopwi project is to test crx2app.

crx2app is a Chrome extension that uses postMessage RPC to communicate the remote debug protocol back to chrome.debugger*
http://code.google.com/chrome/extensions/dev/debugger.html

Some things won't work because the Chrome remote debug protocol is not yet completely exposing the capabilities of the socket protocol.
