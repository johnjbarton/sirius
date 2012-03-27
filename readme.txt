Sirius - Chrome Extension for Orion Web Tools Platform

Requires Chrome dev channel version 19+

To run atopwi, a modified Chrome Devtool (aka Web Inspector)
---------------------------------------------------------

1. clone this repo
2. Open chrome://extensions
   set developer mode
   load unpacked extension
   point the subdirectory sirius/extension from the repo in step 1
   You  should see the Sirus Star icon
3. Reload any tab and use the context menu option Debug Sirius
4. The first time the devtools window comes up, it will be blank, just
right click and reload.  This is a bug in Chrome 19 that will be fixed
soon.


Other Sirius Ideas:
---------------------------------------------------------------

A Page Action Icon (Orion brand icon) appears in the URL bar.

  Files served from Orion --> Click page action icon to open editor
  Editing files in Orion  --> Click page action icon to open as file 
  
Devtools edit-and-save
  
  JS or CSS edits in Web Inspector on Orion files Control+S --> Save to Orion
   if Orion editor is open with changes on the same file, abort save
  
----------------------------------------------------------------------  
Notes for me:  
  
Fake git submodules under /extension
  git clone git@github.com:johnjbarton/atopwi.git extension/atopwi
  cd extension/atopwi
  git checkout sirius
  cd ../..
  git clone git@github.com:johnjbarton/OrionEditorEmbedded.git extension/OrionEditorEmbedded
  git clone git@github.com:johnjbarton/MetaObject.git extension/MetaObject
  git clone git@github.com:johnjbarton/orion.client.git extension/orion.client
  cd extension/orion.client
  git checkout hackOrionUtils
  cd ../..
  git clone git@github.com:johnjbarton/crx2app.git extension/crx2app
