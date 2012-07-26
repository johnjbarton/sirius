// See Purple/license.txt for Google BSD license
// Copyright 2011 Google, Inc. johnjbarton@johnjbarton.com

/*globals define window console*/

define(['domplate/lib/domplate', 'resources/PartLinkRep', 'resources/Resources', 'reps/reps',  'reps/Rep', 'firebugSource/Str'], 
function (            domplate,             PartLinkRep,             Resources,        Reps,         Rep,                 Str) {
  
  var dp = domplate.tags;
  
    // a twisty that adds elements on click
    // {action: function (event) { return disclosedElement; } }
    var LazyDisclosureRep = domplate.domplate({
      tag: dp.SPAN({'onclick':'$action|setToggleMore'},
             dp.IMG({'class':'closedLazy', 'src':"ui/icons/from-firebug/twistyClosed.png"}),
             dp.IMG({'class':'openedLazy', 'src':"ui/icons/from-firebug/twistyOpen.png"})
           ),

      // called when the domplate is expanded
      setToggleMore: function(action) {
        // called when the user clicks
        return function toggleMore(event) {  
          var elt = event.currentTarget;
          if (!elt.resolved) {
            elt.resolved = action(event);
          }
          elt.classList.toggle('lazyOpened');
          if (elt.classList.contains('lazyOpened')) {
            elt.resolved.classList.remove('lazyClosed');
          } else {
            elt.resolved.classList.add('lazyClosed');
          }
        };
      }
    });
  
    var stackFrameRep =  domplate.domplate(
      PartLinkRep, 
      {
        tag:  // the property |tag| is special, see domplate isTag()
              dp.TR({'class':'callStackFrame noSource'}, 
                dp.TD({'class':'functionName'}, '$object|getFunctionName'), // only one of the next two should be shown
                dp.TD({'class':'sourceCodeJS', 'id':'$object|getId'}, ""),
                dp.TD({'title':'$object|getTooltipText'},
                   dp.TAG(PartLinkRep.tag, {object:'$object'})
                )
              ),

        getFunctionName: function(frame) {
          return frame.functionName;
        },
        
        getUniqueId: function() {
          this.timesCalled = (this.timesCalled || 0) + 1;
          return "sf_"+this.timesCalled;
        },
        
        getId: function(object) {
          var resource = this.getResource(object);
          var id = this.getUniqueId();
          if (resource && resource.fetchContent) {
            resource.fetchContent(
              this.updateFrameUI.bind(this, object, id),
              this.reportFail
            );
          }
          return id;
        },

        updateFrameUI: function(object, id, content) {
          // yay we got the content
          var elt = window.document.getElementById(id);
          var line = this.getLineNumber(object);
          var src = content.body.split('\n');  // TODO window/unix bah
          elt.innerHTML = Str.escapeForSourceLine(src[line - 1]);
        }, 
        
        reportFail: function() {
          console.log("stackFrameRep.getSourceLine FAILED", arguments);
        },

        getTooltipText: function(object) {
          var line = this.getLineNumber(object);
          return this.getURL(object)+(line ? ('@'+line) : "");
        },
      
        name: "stackFrameRep",
        
        getRequiredPropertyNames: function() {
          return ['url', 'functionName'];
        }
      }
    );
    Reps.add(stackFrameRep);
    
    var callStackRep = domplate.domplate({
      tag: dp.TABLE({'class':'callStack'},
             dp.TBODY(
               dp.FOR('frame', '$frames',
                 dp.TAG(stackFrameRep.tag, {object: '$frame'})
               )
             )
           )
    });

    var editingFrameRep =  domplate.domplate(
      PartLinkRep, 
      {
        tag:  
          dp.TR({'class':'editorRow noSource'}, 
            dp.TD({'class':'editorCell', 'id':'$object|getId'}, 
              dp.DIV({'class': 'editor', 'id': 'editor'}, ''
                // filled in by editor
              )
            ) 
          ),

        getUniqueId: function() {
          this.timesCalled = (this.timesCalled || 0) + 1;
          return "sf_"+this.timesCalled;
        },
        
        getId: function(object) {
          var resource = this.getResource(object);
          var id = this.getUniqueId();
          var bottomLine = this.getLineNumber(object);
          window.setTimeout(this.openEditorOn.bind(this, id, resource, bottomLine));
          return id;
        },

        openEditorOn: function(id, resource, bottomLine) {
          var elt = window.document.getElementById(id);
          var url = resource.url;
          return;
          var editor = new EditorInterface(elt.firstElementChild);
          var line = bottomLine - 4; // position the frame line at the bottom
          var col = this.getColumnNumber(object);
          console.log('editor ready, opening '+url + '@' +bottomLine + '.' +col);
          editor.open(url, line);
          this.highlightRegion(elt, line, 1, col);
        },

        updateFrameUI: function(object, id, content) {
          // yay we got the content
          var elt = window.document.getElementById(id);
          var line = this.getLineNumber(object);
          var src = content.body.split('\n');  // TODO window/unix bah
          elt.innerHTML = Str.escapeForSourceLine(src[line - 1]);
        }, 
        
        highlightRegion: function(element, line, startCol, endCol) {
          var rulerLines = element.querySelectorAll('rulerLines');
        },
        
        reportFail: function() {
          console.log("stackFrameRep.getSourceLine FAILED", arguments);
        },

        getTooltipText: function(object) {
          var line = this.getLineNumber(object);
          return this.getURL(object)+(line ? ('@'+line) : "");
        },
      
        name: "editingFrameRep",
        
        getRequiredPropertyNames: function() {
          return ['url', 'functionName'];
        }
      }
    );
    Reps.add(editingFrameRep);

    var editingStackRep = domplate.domplate({
      tag: 
        dp.TABLE({'class':'editingStack'},
          dp.TBODY(
            dp.FOR('frame', '$frames|newestFrames',
              dp.TAG(editingFrameRep.tag, {object: '$frame'})
            )
          )
        ),
      newestFrames: function(frames) {
        return frames.slice(0,3);
      }
         
    });


    //  http://code.google.com/chrome/devtools/docs/protocol/0.1/console.html#type-ConsoleMessage

    var consoleEntryRep = domplate.domplate(
      Rep,
      {
      tag: dp.DIV({'class': 'console-$object.message.level'},
        dp.SPAN({'class': 'linkedText'},
          dp.TAG(LazyDisclosureRep.tag, {action: '$object.message|expandStack'}),
          dp.SPAN('$object.message.text'),
          dp.SPAN({'title':'$object|getTooltipText', 'class': 'messageLink'},
            dp.TAG(PartLinkRep.tag, {object:'$object.message'})
          )
        )
      ),
      
      getURL: function(object) {
        if (object.url) {
          return object.url;
        }
        if (object.message) { 
          if (object.message.url) {  
            return object.message.url;  
          } else {  // missing or blank
            if (object.message.stackTrace) {
              return object.message.stackTrace[0] && object.message.stackTrace[0].url;
            }
          }
        }
        console.log("getURL fails for %o", object);
        return "(no URL)";
      },
      
      getTooltipText: function(object) {
        return this.getURL(object);
      },
      
      expandStack: function(message) {
        var stack = this.getFrames(message);
        return function(event) {
          var elt = event.currentTarget;
          var stackElt = editingStackRep.tag.insertAfter({frames: stack}, elt.parentElement);
          return stackElt;
        };
      },
      
      toggleMore: function(event) {
        var target = event.currentTarget;  // the element with the handler
        target.classList.toggle('hadMore');
        target.classList.toggle('hasMore');
      },
      hasMore: function(object) {
        return this.getFrames(object.message).length ? 'hasMore' : '';
      },
      getFrames: function(consoleMessage) {
        return consoleMessage.stackTrace || [];
      },
      getLineNumber: function(object) {
        return object.message && object.message.line;
      },
      name: 'consoleEntryRep',
      getRequiredPropertyNames: function() {
        return ['message'];
      }
    });
    
    consoleEntryRep.messagesClearedEntryRep = domplate.domplate({
        tag: dp.DIV({'class':'consoleCleared'}, "Console Cleared")
      });
    
    consoleEntryRep.InternalExceptionTag = domplate.domplate(
      consoleEntryRep,
      {
      tag: 
        dp.DIV({'class': 'console-error internalError hasMore', 'onclick': '$toggleMore'}, '$object.message',
          dp.TABLE({'class':'callStack'},
            dp.TBODY (
              dp.FOR('frame', '$object|getFrames',
                dp.TAG(stackFrameRep.tag, {object: '$frame'})
              )
            )
          )
        ),
      getFrames: function(message) {
        var stack = message.stack;
        // The internal errors has a funky string stack
        var frames = [];
        if (!stack) {
          return frames;
        }
        var frameStrings = stack.split('\n');
        // zeroth entry is exception message
        for (var i = 1; i < frameStrings.length; i++) {
          var frame = {};
          //eg:     at Object.<anonymous> (eval at <anonymous> (http://localhost:8080/file/f/lib/domplate/lib/domplate.js:482:34))
          var frameString = frameStrings[i];
          if (frameString.indexOf('    at') === 0) {
            var splits = frameString.split(/\s/);
            frame.functionName = splits.slice(5,-1).join(' ');
            var fileArea = splits.slice(-1)[0];
            var m = /\(([^\)]*)\)/.exec(fileArea);
            var colonSplits = m[1].split(':');
            frame.url = colonSplits.slice(0, -2).join('');
            frame.lineNumber = colonSplits.slice(-2, -1)[0];
            frame.columnNumber = colonSplits.slice(-1)[0];
            frames.push(frame);
          }
        }
        return frames;
      }
    });
  
  Reps.add(consoleEntryRep);
  
  return consoleEntryRep;
});
