
// Modules
// **********************************************************************************
var config        = require('../../config/config');
var controllerDef = require('../controllers/api.resource.controller');
var express       = require('express');

// Module Export
// **********************************************************************************
module.exports = function (modelName)
{
	"use strict";

	var controller = controllerDef(config.connection.model(modelName));
	var router     = express.Router();

	// Routes
	router.route('/')
		.get(controller.get)
		.post(controller.post);

	// Middleware to get document from the db
	router.use('/:id', controller.cacheId);

	router.route('/:id')
		.get(controller.getById)
		.put(controller.putById)
		.patch(controller.patchById)
		.delete(controller.deleteById);

	return router;
};
