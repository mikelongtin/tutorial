
// Modules
var app    = require('../app');
var config = require('./config');

// Routing
module.exports = function (server)
{
	"use strict";
	
	// Event listener for HTTP server "error" event.
	server.on('error', function (err) 
	{
		if (err.syscall !== 'listen')
		{
			throw err;
		}

		var port = app.get('port');
		var bind = (typeof port === 'string')? 'Pipe ' + port : 'Port ' + port;

		// handle specific listen errors with friendly messages
		switch (err.code) 
		{
			case 'EACCES':
				console.error(bind + ' requires elevated privileges');
				process.exit(1);
				break;
			case 'EADDRINUSE':
				console.error(bind + ' is already in use');
				process.exit(1);
				break;
			default:
				throw err;
		}
	});

	// Event listener for HTTP server "listening" event.
	server.on('listening', function () 
	{
		var addr = server.address();
		var bind = (typeof addr === 'string')? 'pipe ' + addr : 'port ' + addr.port;
		console.log('Express server listening on ' + bind);
	});
};