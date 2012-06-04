# Sirius

### Integrating Chrome Devtools with Other Web Dev Tools

  * Tracks Chrome Devtools front-end
  * Wraps Chrome Devtools front-end in an iframe
  * Connects to Chrome backend over chrome.debugger proxy (crx2app)
  * Add extensions to support
    * Orion Web IDE
    * Others TODO

### Coming soon

  * Extends `chrome.devtools` to add `chrome.devtools.remoteDebug` for extensions
  * Improvements for editing, including plugable editors

---

Requires Chrome version 20+

## Install

  1. Clone this repo `git clone https://github.com/jankeromnes/sirius.git`
  2. Open `chrome://extensions`
  3. Set developer mode
  4. Load unpacked extension
  5. Point the subdirectory `sirius/extension` from the repo in step 1
  6. You  should see the Sirius Star icon
  7. Restart chrome and use the context menu option `Debug With Sirius`

## Other Sirius Ideas

### A Page Action Icon (Orion brand icon) appears in the URL bar

  - Files served from Orion → Click page action icon to open editor
  - Editing files in Orion → Click page action icon to open as file 
  
### Devtools edit-and-save
  
  - JS or CSS edits in Web Inspector on Orion files `<Ctrl>+<S>` → Save to Orion
  - If Orion editor is open with changes on the same file, abort save
  
## Notes for development under Sirius

  - `extension/atopwi/inspector/front-end` is a git-tx transplant from
Chromium build `src/out/Release/inspector/`
  - See `bin/git-tx`
