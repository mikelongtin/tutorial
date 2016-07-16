
// Modules
var app  = require('../app.js');

module.exports = Backbone.View.extend(
{
	el: 'body',

	initialize: function ()
	{
		"use strict";

		this.render();
	},

	render: function ()
	{
		"use strict";

		this.nav = new app.views.Nav({ attributes: { 'data-region': 'body' } });

		return this;
	}
});
