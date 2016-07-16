
// Modules
var app    = require('../app.js');
var Loader = require('../controllers/load.controller.js');

// Collection
var Collection = Backbone.Collection.extend(
{
	model    : app.models.Locations,
	url      : '/api/locations',
	isloaded : new Loader()
});

module.exports = new Collection();
