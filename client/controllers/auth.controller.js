
// Modules
var app = require('../app.js');

// Authentication
var auth =
{
	loggedIn : '',

	get: function ()
	{
		"use strict";

		this.loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
		return this;
	},

	set: function (authResult)
	{
		"use strict";

		this.loggedIn = authResult;
		localStorage.setItem('loggedIn', JSON.stringify(this.loggedIn));
		return this;
	},

	clear: function ()
	{
		"use strict";

		this.loggedIn = '';
		localStorage.removeItem('loggedIn');
		return this;
	},

	currentUser: function ()
	{
		"use strict";

		if (this.loggedIn && this.loggedIn.authenticated)
		{
			var authenticated = { _id: this.loggedIn.user.userName, name: this.loggedIn.user.displayName, active: true, group : [] };
			return app.collections.Users.findWhere({ _id: this.loggedIn.user.userName }) || authenticated;
		}
	},

	isAdmin: function ()
	{
		"use strict";

		var currentUser = this.currentUser();
		return (currentUser && currentUser.cid && _.indexOf(currentUser.get('group'), 'admin') !== -1);
	}
};

// Initialize by reading localStorage
auth.get();

module.exports = auth;
