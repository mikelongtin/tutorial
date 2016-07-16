
// Modules
var app    = require('../app.js');
var Loader = require('../controllers/load.controller.js');

// Collection
var Collection = Backbone.Collection.extend(
{
	model    : app.models.Incidents,
	url      : '/api/incidents',
	isloaded : new Loader()
});

module.exports = new Collection();
