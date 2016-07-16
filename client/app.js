
// Application Namespace
var app =
{
	auth        : {},
	models      : {},
	collections : {},
	jade        : {},
	views       : {},
	body        : {},
	version     : false,
	isloaded    : false,
	datatable   : false
};

// Export
module.exports = window.app = app;

// Authentication
app.auth = require('./controllers/auth.controller.js');

// Models
app.models.Incidents = require('./models/incidents.model.js');
app.models.Locations = require('./models/locations.model.js');
app.models.Users     = require('./models/users.model.js');

// Collections
app.collections.Incidents  = require('./collections/incidents.collection.js');
app.collections.Locations  = require('./collections/locations.collection.js');
app.collections.Users      = require('./collections/users.collection.js');

// Views
app.views.App                  = require('./views/app.view.js');
app.views.Nav                  = require('./views/nav.view.js');
app.views.Main                 = require('./views/main.view.js');
app.views.MainDatatable        = require('./views/main.datatable.view.js');
app.views.Login                = require('./views/login.view.js');

// Event Aggregator
app.events = _.extend({}, Backbone.Events);

// Initialize the Application View
app.view = new app.views.App();

// Socket.io Connection
app.socket = require('./socket/connection.js')();

// Load the Application
app.load = function ()
{
	"use strict";

	if (!app.isloaded)
	{
		// Router
		app.router = require('./routers/app.router.js');

		// Done
		app.isloaded = true;
	}
};
