
// Modules
// **********************************************************************************
var config   = require('../../config/config');
var mongoose = require('mongoose');

// Schema
var schema = new mongoose.Schema(
{
	'_id'             : { type: String, unique: true },
	'number'          : { type: String },
	'country'         : { type: String },
	'full_name'       : { type: String },
	'u_location_type' : { type: String },
	'city'            : { type: String },
	'name'            : { type: String },
	'state'           : { type: String }
}, 
{ collection: 'locations' });

// Module Export
// **********************************************************************************
module.exports = config.connection.model('Locations', schema, 'locations');

// ALL EVENTS WILL OCCUR FOR EACH SOCKET
// **********************************************************************************
module.exports.loadEventEmitter = function (io, socket)
{
	"use strict";

	// The POST event processes after the change has been commited to the DB
	schema.post('save', function (doc)
	{
		// Emits to all connected sockets except the one that initiated the event
		socket.emit('updated-location', doc);
	});
};