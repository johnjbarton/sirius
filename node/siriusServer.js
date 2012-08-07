var static = require('node-static');

//
// Create a node-static server instance to serve the '/work' folder
//

function servePathAtPort(path, port) {
	var file = new(static.Server)(path);

	require('http').createServer(function (request, response) {
	    request.addListener('end', function () {
	        //
	        // Serve files!
	        //
	        //console.log("request ", request);
	        file.serve(request, response);
	    });
	}).listen(port);
	console.log('serving ' + path + ' at ' + port);	
}

servePathAtPort('../../qpp', 8686);

servePathAtPort('../extension/atopwi', 9696);

servePathAtPort('../../webdev-examples', 7676);


