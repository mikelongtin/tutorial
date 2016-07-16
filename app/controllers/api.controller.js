
// Modules
var config = require('../../config/config');
var _      = require('lodash');

// API Controller
module.exports = function ()
{
	"use strict";

	return {
		get : function (req, res)
		{
			var resources = _.map(config.connection.models, function (model)
			{
				var resource = {};
				resource.resource = model.modelName.toLowerCase();
				resource.links = {};
				resource.links.self = 'http://' + req.headers.host + req.baseUrl + '/' + resource.resource;
				return resource;
			});

			res.status(200);
			res.json(resources);
		}
	};
};
