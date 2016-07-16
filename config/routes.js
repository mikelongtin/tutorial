
// Modules
// **********************************************************************************
var app      = require('../app');
var config   = require('./config');
var Promise  = require('bluebird');
var fs       = Promise.promisifyAll(require('fs'));
var _        = require('lodash');

// Polyfill
// **********************************************************************************
_.assign(_, require('../app/lib/polyfill'));

// Initialize Routes
// **********************************************************************************
module.exports = function ()
{
	"use strict";

	var PREFIX         = 'api';
	var LABEL          = 'route';
	var RESOURCE_ROUTE = 'api.resource.route.js';

	// Static Routes - removed the resource constructor route
	return fs.readdirAsync(config.path.app.routes).then(function (routes)
	{
		return Promise.map(_.pull(routes, RESOURCE_ROUTE), function (filename)
		{
			return new Promise(function (resolve, reject)
			{
				var route = _.transformFilenameIntoRoute(filename, LABEL);
				resolve(app.use(route, require(config.path.app.routes + '/' + filename)()));
			});
		});
	})
	// Resource routes
	.then(function ()
	{
		return Promise.map(_.keys(config.connection.models), function (modelname)
		{
			return new Promise(function (resolve, reject)
			{
				var route = _.transformModelnameIntoRoute(modelname, PREFIX);
				resolve(app.use(route, require(config.path.app.routes + '/' + RESOURCE_ROUTE)(modelname)));
			});
		});
	});
};
