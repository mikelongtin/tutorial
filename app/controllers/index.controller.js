
// Route
var title    = 'Home';
var template = 'index';
var basepath = '/';

// Controller
module.exports = function ()
{
	"use strict";

	return {
		get : function (req, res)
		{
			res.render(template, { title: title, basepath: basepath });
		}
	};
};
