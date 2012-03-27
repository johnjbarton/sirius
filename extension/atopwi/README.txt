atopwi - atop Web Inspector (a-top-wee)

Requires Chrome 18+

This is the Web Inspector aka Chrome DevTools front end running in a web page.

With Orion
----------

The ./orionPlugin.html integrates atopwi with Orion (http://wiki.eclipse.org/Orion).
Once you install the code into your workspace and the plugin into your Orion
Settings, you will have a new OpenWith entry "Chrome Devtools" for .html files.
Selecting this entry will open the .html URL and the debugger.

Orion Install.
--------------
Please be patient: the install is still rather involved.

  1. Follow the instructions to install OrionEditorEmbedded:
      https://github.com/johnjbarton/OrionEditorEmbedded
  2. Clone this git project into your workspace
      https://johnjbarton@github.com/johnjbarton/atopwi.git
  3. Add another entry to the Site you created in step #1:
       http://<your-orion-domain>/file/<atopwi project id>  /atopwi
  4. Follow the instructions to install crx2app
       https://github.com/johnjbarton/crx2app
  5. In chrome://extensions, crx2app 'options' add an entry like
       http://<your-atopwi-site>/atopwi.html
  6. Hang in there almost done! Open Orion 
       http://<your-atopwi-site>/index.html
  7. Double Down arrow upper RHS: select Settings > Install, input
       http://<your-atopwi-site>/atopwi/orionPlugin.html
  8. Open an Orion naviagation page
       Click on the double down arrow after a .html file > Open With > Chrome Devtools


As a concept system test
------------------------

The initial purpose of the atopwi project is to test crx2app:
  https://github.com/johnjbarton/crx2app
crx2app is a Chrome extension that uses postMessage RPC to communicate the 
remote debug protocol back to chrome.debugger*
http://code.google.com/chrome/extensions/dev/debugger.html


Non-Orion Install:
  clone this repo in a directory you can serve on a web server.
  open atopwi.html in a web browser
  copy the URL for atopwi.html 
  install the crx2app extension
  use the extension 'options' page to allow the atopwi.html URL
  use the extension 'options' page to add the 'Debug with ATopWi' context menu option.
  right click on a page you want to debug.


Some things won't work because the Chrome remote debug protocol is not yet 
completely exposing the capabilities of the socket protocol.
