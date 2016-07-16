
// Modules
var app = require('../app.js');

// Templates
app.jade.main = require('../templates/main.jade');

module.exports = Backbone.View.extend(
{
	className: 'container-fluid',

	subViews: {},

	initialize: function ()
	{
		"use strict";
		
		window.scrollTo(0,0);

		// Global Event Listeners
		this.listenTo(app.events, 'clear:content', this.clear);

		// Render to DOM
		this.render();
	},

	render: function ()
	{
		"use strict";

		// Render to DOM
		this.$el.empty().append(app.jade.main()).appendTo(this.attributes['data-region']);
		this.subViews.maindatatable     = new app.views.MainDatatable({ el: '.page-table' });

		$('.dropdown-button').dropdown({ hover: false });
		$('.button-collapse').sideNav();

		return this;
	},

	clear: function ()
	{
		"use strict";

		_.each(this.subViews, function (view)
		{
			view.$el.remove();
			view.remove();
		});

		this.$el.remove();
		this.remove();
	}
});
