
// Modules
// **********************************************************************************
var config        = require('../../config/config');
var controllerDef = require('../controllers/api.auth.controller');
var express       = require('express');

// Module Export
// **********************************************************************************
module.exports = function ()
{
	"use strict";

	var controller = controllerDef(config.connection.model('Users'));
	var router     = express.Router();

	// Routes
	router.route('/')
		.post(controller.post);

	return router;
};
