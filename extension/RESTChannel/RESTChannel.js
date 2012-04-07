// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

/*globals window console */


// Don't use AMD here, it's too hard to sync the load events 

window.RESTChannel = (function() {

  var debug = false;

  var msgNumber = 0;
  var pending = {};

  function Connection() {
    this.registry = {};
  }
  
  Connection.prototype = {
  
    serial: function(onOk, onErr) {
      if (!onOk && !onErr) {
        throw new Error("RESTChannel Connection: No response or error handler");
      }
      var serial = ++msgNumber;
      pending[serial] = {
        ok: onOk,
        err: onErr
      };
      return serial;
    },
  
    attach: function(port, onAttach) {
      this.port = port;
    },
    
    close: function() {
      this.port.close(); 
    },
    
    // Commands to remote 
    //
    optionsObject: function(url, onOk, onErr) {
      this.port.postMessage({
          method: 'OPTIONS', 
          url: url, 
          serial: this.serial(onOk, onErr)
      });
    },
    
    getObject: function(url, onOk, onErr) {
      this.port.postMessage({
          method: 'GET', 
          url: url, 
          serial: this.serial(onOk, onErr)
      });
    },
    
    putObject: function(url, obj, onOk, onErr) {
      this.port.postMessage({
          method: 'PUT', 
          url: url,
          body: obj,
          serial: this.serial(onOk, onErr)
      });
    },
    
    postObject: function(url, obj, onOk, onErr)  {
      this.port.postMessage({
          method: 'POST', 
          url: url,
          body: obj,
          serial: this.serial(onOk, onErr)
      });
    },
    
    deleteObject: function(url, onOk, onErr) {
      this.port.postMessage({
          method: 'DELETE', 
          url: url,
          serial: this.serial(onOk, onErr)
      });
    },
    
    respond: function(serial, obj) {
      this.port.postMessage({
          method: 'REPLY',
          url: '/',
          status: 200,
          serial: serial,
          body: obj
      });
    },
    
    // System 'options', either all registered URLs or all methods at a URL
    options: function(obj) {
      var service = this.registry[obj.url];
      if (service) {
        var keys = [];
        do {
          keys = keys.concat( Object.keys(service) );
          service = Object.getPrototypeOf(service);
        } while(service !== Object.prototype);
        return keys;
      } else {
        return Object.keys(this.registry);
      }
    },
    
    // Commands from remote
    //
    register: function(url, handler) {
      this.registry[url] = handler;
      // return a 'reference' to this handler
      return {url: url};
    },
    
    dispatch: function(msgObj) {
      var method = msgObj.method.toLowerCase();
      var service = this.registry[msgObj.url];
      if (service && (method in service) ) {
        // Call service with the connection and the object sent (if any).
        return service[method](this, msgObj.body);
      } else {
        if (method === 'options') {
          return this.options(msgObj);
        }
      }
    }
  };

  function RESTChannel(port, connection) {
    this.connection = connection;
    port.onmessage = this._onmessage.bind(this);
    port.start();
    this.connection.attach(port);
  }

  var methods = [
    'REPLY',
    'OPTIONS', 
    'GET',
    'PUT',
    'POST',
    'DELETE'
  ];

  RESTChannel.prototype = {
  
    _badRequest: function(obj) {
      obj.status = 400;
      obj.reason = 'Bad Request';
      this.connection.respond(null, obj);
      this.connection.close(); // you had your chance, you blew it.
    },
    
    _notImplemented: function(serial, obj) {
      obj.status = 501;
      obj.reason = "Not Implemented";
      this.connection.respond(serial, obj);
    },
    
    _envelop: function(obj) {
      return {
        url: obj.url,
        method: obj.method,
        serial: obj.serial
      };
    },
  
    _onmessage: function(event) {
      
      var msgObj = this._validate(event);
      if (debug) {
        console.log('recv: ', msgObj);
      }
     
      if (msgObj) {
        if (msgObj.method === 'REPLY') {
          var callbacks = pending[msgObj.serial]; 
          if (callbacks) {
            var status = msgObj.status;
            if (status >= 200 && status < 300 && callbacks.ok) {
              callbacks.ok(msgObj.body, msgObj);
            } else if (callbacks.err) {
              callbacks.err(msgObj);
            } else {
              console.error("RESTChannel response but no handlers", msgObj);
            }
          } else {
            console.error("RESTChannel response but no pending message", msgObj);
          }
        } else {
          var envelop = this._envelop(msgObj);
          var response = this.connection.dispatch(msgObj);
          if (response) {
            this.connection.respond(envelop.serial, response);
          } else {
            return this._notImplemented(envelop.serial, envelop);
          }
        }
      }
    },
    
    _validate: function(event) {
      if (!event) {
        return this._badRequest({message: 'No event'}); 
      }
      var msgObj = event.data;
      if (!msgObj) {
        return this._badRequest({message: 'No event.data'}); 
      } 
      var method = msgObj.method; 
      if (!method || methods.indexOf(method) === -1) {
        return this._badRequest({
            message: 'Unknown Method', 
            method: method, 
            url: msgObj.url, 
            serial: msgObj.serial
        });
      }
      var serial = msgObj.serial; 
      if (!serial && method !== 'REPLY') {
        return this._badRequest({message: 'No serial number'}); 
      } 
      var url = msgObj.url;
      if (!url && method !== 'REPLY') {
        return this._badRequest({message: 'No URL', serial: serial}); 
      }
      if (debug) {
        console.log(msgObj.serial+' valid '+msgObj.method+' '+msgObj.url, msgObj);
      }
      return msgObj;
    }
    
  };

  function accept(connection, onAttach, event) {
    if (event.data && event.data === "RESTChannel") {
      if (debug) {
        console.log(window.location + " RESTChannel accept ", event);
      }
      var port = event.ports[0];
      onAttach( new RESTChannel(port, connection) );
    } // else not for us
  }

  function listen(connection, onAttach) {
    var onIntroduction = accept.bind(null, connection, onAttach);
    window.addEventListener('message', onIntroduction);
    return function dispose() {
      window.removeEventListener('message', onIntroduction);
    };
  }
  
  function talk(listenerWindow, connection, onAttach) {
    var channel = new window.MessageChannel();
    if (debug) {
      console.log('talk post');
    }
    listenerWindow.postMessage('RESTChannel', '*', [channel.port2]);
    onAttach( new RESTChannel(channel.port1, connection) );
    return function dispose() {
      channel.port1.close();
    };
  }
  
  return {
    talk: talk,
    listen: listen,
    Connection: Connection
  };

}());