
// Modules
// **********************************************************************************
var config   = require('./config');
var mongoose = require('mongoose');
var Promise  = mongoose.Promise = require('bluebird');

// Module Export
// **********************************************************************************
module.exports = function ()
{
	"use strict";

	// Return a promise with connection
	return new Promise(function (resolve, reject)
	{
		// Make Connection and attach handlers
		var conn = mongoose.createConnection('mongodb://' + config.dbHost + ':' + config.dbPort + '/' + config.dbName)
			.on('error', function (err)
			{
				console.log('Failed to connect to mongo on startup: ' + err);
				reject(err);
			})
			.on('connected', function ()
			{
				resolve(conn);
			});
	})
	.then(function (conn)
	{
		// Store Connection
		config.setProperties({ connection: conn });
		return config.connection;
	})
	.catch(function (err)
	{
		throw err;
	});
};
