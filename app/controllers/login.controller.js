
// Route
var title    = 'Login';
var template = 'index';
var basepath = '/' + title.toLowerCase();

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
