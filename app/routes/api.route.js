
// Modules
// **********************************************************************************
var config        = require('../../config/config');
var controllerDef = require('../controllers/api.controller');
var express       = require('express');

// Module Export
// **********************************************************************************
module.exports = function ()
{
	"use strict";

	var controller = controllerDef();
	var router     = express.Router();

	// Routes
	router.route('/')
		.get(controller.get);

	return router;
};
