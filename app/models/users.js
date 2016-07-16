
// Modules
// **********************************************************************************
var config   = require('../../config/config');
var mongoose = require('mongoose');

// Schema
var schema = new mongoose.Schema(
{
	'_id'                : { type: String, require: true },
	'name'               : { type: String, default: '' },
	'email'              : { type: String, default: '' },
	'group'              : 
	[
		{ type: String }
	],
	'active'             : { type: Boolean, default: true }
}, 
{ collection: 'users' });

// Module Export
// **********************************************************************************
module.exports =  config.connection.model('Users', schema, 'users');

// ALL EVENTS WILL OCCUR FOR EACH SOCKET
// **********************************************************************************
module.exports.loadEventEmitter = function (io, socket)
{
	"use strict";

	// The POST event processes after the change has been commited to the DB
	schema.post('save', function (doc)
	{
		// Emits to all connected sockets except the one that initiated the event
		socket.emit('updated-user', doc);
	});
};