Sirius - Chrome Extension for Orion Web Tools Platform

A Page Action Icon (Orion brand icon) appears in the URL bar.

  Files served from Orion --> Click page action icon to open editor
  Editing files in Orion  --> Click page action icon to open as file 
  
Devtools edit-and-save
  
  JS or CSS edits in Web Inspector on Orion files Control+S --> Save to Orion
   if Orion editor is open with changes on the same file, abort save
  
----------------------------------------------------------------------  
Notes for me:  
  
Submodules under /extension
  git submodule add git@github.com:johnjbarton/atopwi.git extension/atopwi
  git submodule add git@github.com:johnjbarton/OrionEditorEmbedded.git extension/OrionEditorEmbedded
  git submodule add git@github.com:johnjbarton/MetaObject.git extension/MetaObject
  git submodule add https://github.com/eclipse/orion.client.git extension/orion.client
  git submodule add git@github.com:johnjbarton/crx2app.git extension/crx2app
  