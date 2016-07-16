
// Modules
var app = require('../app.js');

function loadCollection (collection, data)
{
	"use strict";

	_.each(data, function (item)
	{
		app.collections[collection].add(item);
	});
	app.collections[collection].isloaded(true);
}

function updatedModel (collection, data)
{
	"use strict";

	var idea = app.collections[collection].get(data._id);
	if (idea === undefined)
	{
		return app.collections[collection].add(data);
	}
	return idea.set(data);
}

// Socket.io Connection
module.exports = function ()
{
	"use strict";

	return io.connect({ reconnection: false })

		// Connection Events
		.on('connect', function ()
		{
			app.events.trigger('nav:connected');
		})
		.on('reconnect', function ()
		{
			app.events.trigger('nav:connected');
		})
		.on('disconnect', function ()
		{
			app.events.trigger('nav:disconnected');
		})

		// Load App Version
		.on('version', function (version)
		{
			app.version = version;
		})

		// Load Collections
		.on('incidents', function (data)
		{
			loadCollection('Incidents', data);
		})
		.on('locations', function (data)
		{
			loadCollection('Locations', data);
		})
		.on('users', function (data)
		{
			loadCollection('Users', data);
		})

		// Updated Models
		.on('updated-incident', function (data)
		{
			updatedModel('Incidents', data);
		})
		.on('updated-location', function (data)
		{
			updatedModel('Locations', data);
		})
		.on('updated-user', function (data)
		{
			updatedModel('Users', data);
		});
};