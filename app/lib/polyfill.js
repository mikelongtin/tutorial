
// Modules
// **********************************************************************************
var _ = require('lodash');



// Polyfill Functions
// **********************************************************************************
module.exports =
{
	isDefined : function (arg)
	{
		"use strict";

		return (arg !== undefined);
	},

	transformFilenameIntoRoute : function (filename, label)
	{
		"use strict";

		return _.chain(filename)
				.split('.')
				.dropRight()
				.dropRightWhile(label? _.matches(label) : _.stubfalse)
				.unshift('')
				.join('/')
				.replace(/index/, '')
				.value();
	},

	transformModelnameIntoRoute : function (modelname, prefix)
	{
		"use strict";

		return _.chain(modelname)
				.toLower()
				.split('.')
				.unshift(prefix)
				.unshift('')
				.join('/')
				.value();
	}
};