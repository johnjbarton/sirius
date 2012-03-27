Adapt the Orion Embedded Editor to be an Orion Editor

Orion has an editor application (edit.html) and a demo project showing how to
embed the editor widget in another application. However the embed widget code
exists to allow another application to customize the editor. 

This project starts with the embed widget code and adds more Orion code to 
re-create the Orion editor application experience outside of the editor 
application.

With this project we can use the editor as a component in another project
and it should feel like we are still editing in Orion.

Development Installation (using Orion)

The development setup is a bit complicated because the Orion tooling is still
under development. We want to combine several modular git projects via server-
side integration. This is a two step process:

1. Clone the git projects:
  https://johnjbarton@github.com/johnjbarton/OrionEditorEmbedded.git
  https://github.com/eclipse/orion.client.git
  https://johnjbarton@github.com/johnjbarton/MetaObject.git
  

2. Create the server integration:
  2.1 Orion > Sites > Create Site
  2.2 Convert To Self-Hosting
  2.3 Add (at the bottom) mappings:
      http://localhost:8080/file/XXX   /orion.client
      http://localhost:8080/file/YYY   /MetaObject
      http://localhost:8080/file/ZZZ   /OrionEditorEmbedded
      Replace <localhost> with your domain and XXX with the letters in Orion
      Navigator for those projects.
 
3. Open OrionEditorEmbedded/editor.html to see the editor without 
   Orion wrapper, OR
   Install OrionEditorEmbedded/editorPlugin.html to see the editor wrapped
   in the Orion UI
   
Architecture:
  editorPlugin.html     orion.page.content plugin, calls editor.html
  editor.html           editor in a web page, tests editorInserter.js
  requireConfig.js      require.js path setup, shared
  requireOverrides.js   Main to pull in modules, specific to editor.html
  editorInserter.js     API for installing OroinEditorEmbedded in an app
  OrionEditor.js        modified Orion embeddededitor.js, add stuff here to
    make this editor act like Orion's edit.html
  orionAssembly.js aggregate a ton of files onto a couple of objects
  
Dependencies:
  MetaObject for orionAssembly
  requirejs via MetaObject/requirejs/require.js for loading JS
  orion.client git project

Demos of the embedded editor:
http://orion.eclipse.org/examples/editor/embeddededitor.html
http://wiki.eclipse.org/Orion/How_Tos/Setup_Orion_Client_Hosted_Site_on_OrionHub
