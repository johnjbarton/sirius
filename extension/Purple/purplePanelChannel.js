function onAttach(connection) {
  window.purple.connection = connection;
  console.log(window.location + ' attach');
  
  connection.register('hello', {
      put: function (obj) {
        return {message:'Did you do your homework?'};
      }
    }
  );
}


console.log(window.location + ' listening');
var onUnload = RESTChannel.listen(window, onAttach);
window.addEventListener('unload', onUnload);

