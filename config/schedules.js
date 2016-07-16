
// Modules
// **********************************************************************************
var config  = require('./config');
var Promise = require('bluebird');
var fs      = Promise.promisifyAll(require('fs'));

// Initialize Scheduled Jobs
// **********************************************************************************
module.exports = function ()
{
	"use strict";

	// Resolve when each scheduled job is initialized
	return fs.readdirAsync(config.path.app.schedules).map(function (schedule)
	{
		return new Promise(function (resolve, reject)
		{
			resolve(require(config.path.app.schedules + '/' + schedule)());
		});
	});
};
