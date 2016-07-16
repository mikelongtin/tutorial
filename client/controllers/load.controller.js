
// Modules
var app = require('../app.js');

// Model
module.exports = function (state)
{
	"use strict";

	state = state || false;

	function isLoaded ()
	{
		var ready = true;
		_.each(app.collections, function (collection)
		{
			if (!collection.isloaded())
			{
				ready = false;
			}
		});

		if (ready)
		{
			return app.load();
		}
		return false;
	}

	return function (val)
	{
		// Set
		if (val !== undefined && state !== val)
		{
			// Commit and check if model is loaded
			state = val;

			// Verify if all Collections are loaded
			isLoaded();
		}

		// Get
		return state;
	};
};