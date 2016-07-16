
// Modules
// **********************************************************************************
var config  = require('./config');
var Promise = require('bluebird');
var fs      = Promise.promisifyAll(require('fs'));

// Initialize Models
// **********************************************************************************
module.exports = function ()
{
	"use strict";

	// Resolve when each model is initialized
	return fs.readdirAsync(config.path.app.models).map(function (modelFile)
	{
		return new Promise(function (resolve, reject)
		{
			require(config.path.app.models + '/' + modelFile);
			resolve();
		});
	});
};
