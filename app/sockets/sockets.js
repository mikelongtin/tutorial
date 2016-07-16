
// Modules
var config = require('../../config/config');
var _      = require('lodash');

// Calculate Daily Status
module.exports = function (server)
{
	"use strict";

	// Set up Socket.io
	var io = require('socket.io').listen(server);

	// Open Socket.io Connection
	io.sockets.on('connection', function (socket) 
	{
		// Load event emitters from each connected socket into the DB Idea model
		require('../models/incidents').loadEventEmitter(io, socket);
		require('../models/locations').loadEventEmitter(io, socket);
		require('../models/users').loadEventEmitter(io, socket);

		// Emit Project Version
		socket.emit('version', config.version);

		// Load Incidents
		config.connection.model('Incidents').find().exec(function (err, docs)
		{
			if (err)
			{
				throw err;
			}
			socket.emit('incidents', docs);
		});

		// Load Locations
		config.connection.model('Locations').find().exec(function (err, docs)
		{
			if (err)
			{
				throw err;
			}
			socket.emit('locations', docs);
		});

		// Load Users
		config.connection.model('Users').find({ active: true }).sort({ name: 1 }).exec(function (err, docs)
		{
			if (err)
			{
				throw err;
			}
			socket.emit('users', docs);
		});
	});
};