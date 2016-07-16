
// Modules
// **********************************************************************************
var config   = require('../../config/config');
var mongoose = require('mongoose');

// Schema
var schema = new mongoose.Schema(
{
	'_id'             : { type: String, unique: true },
	'name'            : { type: String },
	'facility'        : { type: String },
	'type'            : { type: String }
}, 
{ collection: 'devices' });

// Module Export
// **********************************************************************************
module.exports = config.connection.model('Devices', schema, 'devices');

// ALL EVENTS WILL OCCUR FOR EACH SOCKET
// **********************************************************************************
module.exports.loadEventEmitter = function (io, socket)
{
	"use strict";

	// The POST event processes after the change has been commited to the DB
	schema.post('save', function (doc)
	{
		// Emits to all connected sockets except the one that initiated the event
		socket.emit('updated-device', doc);
	});
};