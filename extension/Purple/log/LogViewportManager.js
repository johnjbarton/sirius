// PurplePart recv message and create log
// Copyright 2011 Google Inc. 
// see Purple/license.txt for BSD license
// johnjbarton@google.com

/*globals define window console document */

define(['log/consoleEntryRep','../resources/objRep','reps/reps' ], 
function(   consoleEntryRep,               ObjRep,      reps) {
  
  'use strict';
  //------------------------------------------------------------------------------------
  // 'reverse listeners': each log is polled for 
  // new entries, the entries are filtered, then displayed.
  
  var LogViewportManager =  {
    _logs: []
  }; 
  
  LogViewportManager.initialize = function(globalClock) {
    this.globalClock = globalClock;
    this.scrollLock = false; // false means the viewport tracks the bottom of the log
    this.onPoll = this.poll.bind(this);
    this.onLogEvent.bind(this);
    this.pollInterval = 500;
    this.optionPolling = false;
    reps.rehash();
  };
    
  LogViewportManager.connect = function(devtoolProtocol, onConnect) {
    this.initializeUI();
    if (this.optionPolling) {
      this.beginPolling();
    } else {
      this.endPolling();
    }
    onConnect();
  };

  LogViewportManager.disconnect = function() {
      this.endPolling();
  };
  
  LogViewportManager.toggleClass = function(name, on) {
    var logElt = document.getElementById('log');
    if (on) {
      logElt.classList.add(name);
    } else {
      logElt.classList.remove(name);
    }
  };
  // -----------------------------------------------------------------------------------
  LogViewportManager.onLogEvent = function(log, p_id) {
    this.update();
  };
  LogViewportManager.add = function(log) {
    log.addListener(this.onLogEvent);
    this._logs.push(log);
  };
  // -----------------------------------------------------------------------------------
  LogViewportManager.computeLineHeight = function() {
    return 14;
  };
  
  var renderedLines = {
    connect: function(elt) {
      this.container = elt;
    },
    isOnBottom: function(elt) {
      return (elt.clientHeight + elt.scrollTop) === elt.scrollHeight;
    },
    bottomOut: function(elt) {
      elt.scrollTop = elt.scrollHeight - elt.clientHeight;  // negative will become zero
    },
    append: function(data, p_id) {
      var dataView = this.renderToHTML(p_id, data);
      if (dataView) {
        // for debug
        var p_id_div = this.container.ownerDocument.createElement('span');
        p_id_div.classList.add('p_id');
        p_id_div.innerHTML = p_id;
        dataView.insertBefore(p_id_div, dataView.firstChild);
        var keepOnBottom = this.isOnBottom(this.container.parentElement);
        this.container.appendChild(dataView);
        if (keepOnBottom) {
          this.bottomOut(this.container.parentElement);
        }
      } 
    },
    clear: function() {
      this.container.innerHTML = "";  // do we need to worry about event listeners leaking?
      this.lastPID = 0;
    },
    renderToHTML: function(p_id, object) {
      var div = this.container.ownerDocument.createElement('div');

      try {
        var rep;
        if (object && object.rep) {
          rep = object.rep;
        } else {
          rep = reps.getRepByObject(object);
        }
        // The rep tags are 'controllers/views', $object is their model
        // tag.subject is set by domplate() to the tag, use the default here
        var tag = rep.shortTag || rep.tag;
        tag.replace({object: object}, div);
      } catch (exc) {
          consoleEntryRep.InternalExceptionTag.tag.replace({object: exc}, div, consoleEntryRep.InternalExceptionTag);
      }
      return div;
    },
    renderToString: function(object) {
      var str = "";
      if(object.toString() === '[object MessageEvent]') {
        str = object.type +" event " + this.summary(object.data);
      } else {
        str = 'Not a MessageEvent,' + this.summary(object);
      }
      return str;
    },
    summary: function(obj) {
      if (!obj) {
        return 'falsy';
      } 
      var objType = typeof obj;
      if (objType === 'string') {
        return obj;
      }
      if (objType !== 'object') {
        return objType;
      }
      var keys = Object.keys(obj);
      var str = '{' + keys.join(',')+'}';
      if (str.length < 100) {
        var sub = [];
        keys.forEach(function (key) {
          sub.push( key+':'+renderedLines.summary(obj[key]) );
        });
        str = '{' + sub.join(',') +'}';
      }
      return str;
    }
  };
  
  LogViewportManager.initializeUI = function () {
    var logElement = document.createElement('div');
    logElement.setAttribute('id', 'log');
    document.body.appendChild(logElement);
    renderedLines.connect(logElement);
  };

  //-------------------------------------------------------
  // Query the logs for entries from event p_id that match the constraints.
  LogViewportManager.pullEntry = function(p_id) {
    var constraint = {  // TODO from findAnything
      matches: function(entry) {
        return true;
      }
    };
    // We want to visit each log so they all can contribute items from p_id.
    // p_id is a proxy for 'time': 
    //   every log entry that can ever appear in the viewport must have a p_id
    //   p_id increase monotonically
    //   an log may or may not have an entry for a p_id
    this._logs.forEach(function filterAndAppendMatches(log) {
      var logEntry = log.get(p_id);
      if (logEntry) {
        if(constraint.matches(logEntry)) {
            renderedLines.append(logEntry, p_id);
        }
      }
    });
  };

  LogViewportManager.update = function() {
    if (!this.scrollLock) {
      var max = this.globalClock.p_id;
      var last = renderedLines.lastPID || 1; 
      // work bottom up and stop once we fill the viewport
      for (var ndx = last; ndx <= max; ndx++) {
        this.pullEntry(ndx);
      }
      renderedLines.lastPID = max;
    }
    delete this.queueUpdate;
  };
  
  LogViewportManager.rebuild = function() {
    renderedLines.clear();
    this.update();
  };
  
  LogViewportManager.boundUpdate = LogViewportManager.update.bind(LogViewportManager);
  
  LogViewportManager.appendData = function (data, p_id) {
    if (!this.queueUpdate) {
      this.queueUpdate = LogViewportManager.boundUpdate;
      window.setTimeout(this.queueUpdate);
    }
  };
  
  LogViewportManager.poll = function(event) {
    if (window.debugLog) {
      var now = new Date().getTime();
      var delta = this.then - now;
      this.then = now;
      console.log("LogViewportManager poll "+delta, event);
    }
    this.update();
  };
  
  LogViewportManager.beginPolling = function() {
    this.pollingId = window.setInterval(this.onPoll, this.pollInterval);
  };
  
  LogViewportManager.endPolling = function() {
    if (this.pollingId) {
      window.clearInterval(this.pollId);
    }
  };
  
  // ---------------------------------------------------------------------------------
  
  
  
  //----------------------------------------------------------------------------------
  
  return LogViewportManager;
  
});