
// Modules
var app  = require('../app.js');

// Templates
app.jade.nav         = require('../templates/nav.jade');
app.jade.navLogin    = require('../templates/navLogin.jade');
app.jade.navLoggedIn = require('../templates/navLoggedIn.jade');

module.exports = Backbone.View.extend(
{
	tagName: 'section',

	className: 'nav',

	titles:
	{
		'main'      : 'IncidentVISUALIZATION',
		'login'     : 'Login'
	},

	events:
	{
		'click .btn-main'      : 'navigate',
		'click .btn-login'     : 'navigate',
		'click .btn-logout'    : 'navigate',
		'click .btn-reconnect' : 'reconnect'
	},

	initialize: function ()
	{
		"use strict";

		// Global Event Listeners
		this.listenTo(app.events, 'nav:disconnected', this.disconnected);
		this.listenTo(app.events, 'nav:connected', this.connected);
		this.listenTo(app.events, 'nav:menu', this.menu);
		this.listenTo(app.events, 'nav:user', this.getUser);

		// Render to DOM
		this.render();
	},

	render: function ()
	{
		"use strict";

		var locals =
		{
			basepath : '/',
			loggedIn : app.auth.loggedIn
		};
		this.$el.empty().append(app.jade.nav(locals)).appendTo(this.attributes['data-region']);

		return this;
	},

	menu: function (route)
	{
		"use strict";

		// Set active menu item
		this.$('.menu-item').removeClass('active');
		this.$('.menu-item[data-route=' + route + ']').addClass('active');

		// Set login menu item
		this.getUser();

		// Set page title
		$('title').html(this.titles[route]);
	},

	getUser: function ()
	{
		"use strict";

		var menuitem = this.$('.menu-item[data-route=login]');
		menuitem.removeClass('open');

		if (app.auth.loggedIn && app.auth.loggedIn.authenticated)
		{
			// Get User
			menuitem.addClass('dropdown').empty().append(app.jade.navLoggedIn({ loggedIn: app.auth.loggedIn }));
		}
		else
		{
			menuitem.removeClass('dropdown').empty().append(app.jade.navLogin());
		}
	},

	disconnected: function ()
	{
		"use strict";

		// Show the reconnect button
		this.$('.menu-item').has('.btn-reconnect').show().addClass('active');
	},

	reconnect: function ()
	{
		"use strict";

		app.socket.connect();
	},

	connected: function ()
	{
		"use strict";

		// Hide the reconnect button
		this.$('.menu-item').has('.btn-reconnect').hide().removeClass('active');
	},

	navigate: function (e)
	{
		"use strict";

		var route = $(e.currentTarget).parents('.menu-item').attr('data-route');
		route = (route === 'main')? '' : route;
		return app.router.navigate('/' + route, { trigger: true });
	}
});
