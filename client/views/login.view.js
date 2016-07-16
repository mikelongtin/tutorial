
// Modules
var app = require('../app.js');

// Templates
app.jade.login = require('../templates/login.jade');

module.exports = Backbone.View.extend(
{
	className: 'container-fluid',

	events:
	{
		'keyup #pass'            : 'submit',
		'click .btn-submit'      : 'submit'
	},

	initialize: function ()
	{
		"use strict";

		window.scrollTo(0,0);

		// Global Event Listeners
		this.listenTo(app.events, 'clear:content', this.clear);

		// Clear auth
		app.auth.clear();

		// Render to DOM
		this.render();
	},

	render: function ()
	{
		"use strict";

		// Render to DOM
		this.$el.empty().append(app.jade.login()).appendTo(this.attributes['data-region']);

		$('.dropdown-button').dropdown({ hover: false });
		$('.button-collapse').sideNav();

		return this;
	},

	submit: function (e)
	{
		"use strict";

		if (e.currentTarget.localName === 'button' || e.keyCode === 13)
		{
			// Authenticate User
			$.ajax(
			{
				url         : '/api/auth',
				method      : 'POST',
				contentType : 'application/json',
				data        : JSON.stringify(
				{
					user: btoa($('#user').val()),
					pass: btoa($('#pass').val())
				})
			})
			.success(function (data)
			{
				app.auth.set(data);
				app.router.navigate('', { trigger: true });
			})
			.fail(function ()
			{
				Materialize.toast('<h3>Authentication Failed!</h3><p>Invalid username or password. Please try again.</p>', 2000, 'toast-block');
			});
		}
	},

	clear: function ()
	{
		"use strict";

		$('.modal-backdrop').remove();
		$('body').removeClass('modal-open');

		this.$el.remove();
		this.remove();
		delete app.view.body;
	}
});
