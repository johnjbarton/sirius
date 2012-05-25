Sirius - Integrating Chrome Devtools with Other Web Dev Tools

  * Tracks Chrome Devtools front-end
  * Wraps Chrome Devtools front-end in an iframe
  * Connects to Chrome backend over chrome.debugger proxy (crx2app)
  * Add extensions to support
    * Orion Web IDE
    * Others TODO
Coming soon:
  * Extends chrome.devtools to add chrome.devtools.remoteDebug for extensions
  * Improvements for editing, including plugable editors

Requires Chrome version 20+

Install
-------------------------------------------------------------------------

1. clone this repo
2. Open chrome://extensions
   set developer mode
   load unpacked extension
   point the subdirectory sirius/extension from the repo in step 1
   You  should see the Sirius Star icon
3. Reload any tab and use the context menu option Debug Sirius

Other Sirius Ideas:
---------------------------------------------------------------

A Page Action Icon (Orion brand icon) appears in the URL bar.

  Files served from Orion --> Click page action icon to open editor
  Editing files in Orion  --> Click page action icon to open as file 
  
Devtools edit-and-save
  
  JS or CSS edits in Web Inspector on Orion files Control+S --> Save to Orion
   if Orion editor is open with changes on the same file, abort save
  
----------------------------------------------------------------------  
Notes for development under Sirius:

  extension/atopwi/inspector/front-end is a git-tx transplant from
Chromium build src/out/Release/inspector/ 
  
  See bin/git-tx
