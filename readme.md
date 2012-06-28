# Sirius

### Integrating Chrome Devtools with Other Web Dev Tools

  * Tracks Chrome Devtools front-end
  * Wraps Chrome Devtools front-end in an iframe
  * Connects to Chrome backend over chrome.debugger proxy (crx2app)
  * Add extensions to support
    * Orion Web IDE
    * Others TODO
  * Extends `chrome.devtools` to add `chrome.devtools.remoteDebug` for extensions
### Coming soon
  * Improvements for editing, including plugable editors

---

Requires Chrome version 20+

## Install

  1. Clone or fork this repo `git clone https://github.com/johnjbarton/sirius.git`
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

  - Do not commit to `master` branch directly

  - branches simulating a patch stack:
    -- syncToWebKit tracks WebKit gclient branch using git-tx-pull
    -- iframeable replaces uses of 'top' with 'parent' so we can embed devtools in an iframe
    -- remoteDebug adds chrome.experimental.devtools.remoteDebug to allow extensions to access backend
    -- DebuggerProtocol implements chrome.experiment.devtools.protocol using remoteDebug
    -- extendable builds on DebuggerProtocol to add extensions to Sirius
    -- purple adds a panel for exploring querypoint debugging
    -- master points to the top of the patch stack

  - For devtools related changes, branch from syncToWebKit and merge the result into master
  -- `extension/atopwi/inspector/front-end` is a git-tx transplant from the `gclient` branch of WebKit to the syncToWebKit branch of Sirius
  -- to update the devtools front end use `git-tx-pull inspector`
  -- See `bin/git-tx`

  - To maintain the patch stack:
     rebaseStack.sh  rebase all branches
     forcePushStack.sh  push all branches forcibly

     Because we are always rebasing, don't use "git pull". Just clone a new copy.