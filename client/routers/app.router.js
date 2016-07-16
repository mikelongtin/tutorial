
// Modules
var app = require('../app.js');

// Router
var Router = Backbone.Router.extend(
{
	routes:
	{
		''             : 'main',
		'login*'       : 'login'
	},

	authorize: function (controller)
	{
		"use strict";

		if (app.auth.loggedIn && app.auth.loggedIn.authenticated)
		{
			return controller();
		}
		return this.navigate('/login', { trigger: true });
	},

	login: function ()
	{
		"use strict";

		app.auth.clear();
		app.events.trigger('clear:content');
		app.events.trigger('nav:menu', 'login');
		app.view.body = new app.views.Login({ attributes: { 'data-region': 'body', 'data-view': 'login' } });
	},

	main: function ()
	{
		"use strict";

		this.authorize(function ()
		{
			app.events.trigger('clear:content');
			app.events.trigger('nav:menu', 'main');
			app.view.body = new app.views.Main({ attributes: { 'data-region': 'body', 'data-view': 'main' } });
		});
	}
});

module.exports = new Router();

// Start Backbone history a necessary step for bookmarkable URL's
Backbone.history.start({ pushState: true });