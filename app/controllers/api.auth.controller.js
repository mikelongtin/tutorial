
// Modules
var config  = require('../../config/config');
var auth    = require('thactivedirectory');
var	btoa    = require('btoa');
var	atob    = require('atob');
var	_       = require('lodash');

// API Controller
module.exports = function (Model)
{
	"use strict";

	return {
		post : function (req, res)
		{
			req.principle = req.body;

			// Read Only
			if (atob(req.principle.user) === 'user' && atob(req.principle.pass) === 'user')
			{
				res.status(200);
				res.json({ authenticated: true, user: { userName: 'user', displayName: 'Anonymous' } });
			}
			else
			{
				var options =
				{ 
					dataStore : config.dataStore,
					ldap      : config.ldap
				};

				options.ldap.username = atob(req.principle.user);
				options.ldap.password = atob(req.principle.pass);

				auth(options).then(function (result)
				{
					if (result.authenticated)
					{
						res.status(200);
						res.json(result);
					}
					else
					{
						res.status(401);
						res.json({ msg: 'Authentication Failed' });
					}
				});
			}
		}
	};
};