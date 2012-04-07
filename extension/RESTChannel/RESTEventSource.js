
function RESTEventSource() {
}

function makeEventSource(errBack) {
    // Private Impl
    
    var listeners = [];

    var privateImpl = {
      dispatch: function(jsonEvent) {
        listeners.forEach(function(listener) {
          var body = listener.body;
          listener.connection.postObject(
            body.url,   // callback addr
            {
              event: jsonEvent  // Should not send all of this...
            },
            errBack
          );
        });
      }
    };
    
    // check that the remote side gave us an addr to fire events at
    function validate(body) {
      return body.url;
    }
    
    // Public API (generic event dispatch) 
    var publicAPI = {
    
      get: function(connection) {
        listeners.some(function(listener) {
          if (listener.connection === connection) {
            return listener.body;
          }
        });
      },
      
      put: function (connection, body) {
        if ( validate(body) ) {
          listeners.push({
            body: body, 
            connection: connection
          });
          return {totalListeners: listeners.length};
        } else {
          return {error: "URL required"};
        }
      },
      
      'delete': function(connection, obj) {
        var found = -1;
        listeners.some(function(listener, index) {
          if (listener.connection === connection) {
            found = index;
            return true;
          }
        });
        if (found !== -1) {
          listeners.splice(found, 1);
        }
      }
    };
    
    return { 
      'iface': publicAPI,
      'impl': privateImpl
    };
}