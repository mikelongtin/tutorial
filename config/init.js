
// Modules
// **********************************************************************************
var	app     = require('../app');
var config  = require('./config');
var Promise = require('bluebird');
var	http    = require('http');

var initializeConnection  = require(config.path.config.mongodb);
var initializeModels      = require(config.path.config.models);
var initializeBootData    = require(config.path.config.bootdata);
var initializeRoutes      = require(config.path.config.routes);
var initializeSchedules   = require(config.path.config.schedules);

// Module Exports
// **********************************************************************************
module.exports = function ()
{
	"use strict";

	// MongoDB Connection
	initializeConnection().then(function ()
	{
		return initializeModels();
	})
	.then(function ()
	{
		return initializeBootData();
	})
	.then(function ()
	{
		return initializeRoutes();
	})
	.then(function ()
	{
		// Create App Server
		var server = http.createServer(app).listen(app.get('port'));

		// Event listeners for HTTP server
		require(config.path.config.listeners)(server);

		// Sockets for HTTP server
		require(config.path.app.sockets + '/sockets')(server);
	})
	.catch(function (err)
	{
		throw err;
	});
};
