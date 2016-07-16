/*jshint -W079 */
// Modules
// **********************************************************************************
var	path    = require('path');
var root    = process.env.THINCIDENTS_HOME || path.resolve('.');
var npm_pkg = require(path.join(root, 'package.json'));
var _       = require('lodash');

// Env Variables
// **********************************************************************************
process.env.PORT     = process.env.PORT || 5000;
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

// Default Configuration
// **********************************************************************************
var config =
{
	// Global Variables
	auth: {},
	root: root,
	path:
	{
		config: 
		{
			init          : path.join(root, 'config', 'init'),
			auth          : path.join(root, 'config', 'auth'),
			mongodb       : path.join(root, 'config', 'mongodb'),
			models        : path.join(root, 'config', 'models'),
			bootdata      : path.join(root, 'config', 'bootdata'),
			routes        : path.join(root, 'config', 'routes'),
			schedules     : path.join(root, 'config', 'schedules'),
			listeners     : path.join(root, 'config', 'listeners')
		},
		app:
		{
			controllers   : path.join(root, 'app', 'controllers'),
			models        : path.join(root, 'app', 'models'),
			routes        : path.join(root, 'app', 'routes'),
			schedules     : path.join(root, 'app', 'schedules'),
			sockets       : path.join(root, 'app', 'sockets'),
			views         : path.join(root, 'app', 'views')
		},
		dist          : path.join(root, 'dist'),
		public        : path.join(root, 'public'),
		node_modules  : path.join(root, 'node_modules')
	},
	version   : npm_pkg.version,
	dataStore :
	{
		ua_username         : 'uaUser',
		ua_password         : process.env.UA_PASSWORD,
		useraccess_uri      : process.env.USERACCESS_URI,
		useraccess_authDB   : 'useraccess',
		useraccess_DB       : 'useraccess',
		resource_key        : 'adCred'
	},
	ldap      :
	{
		url           : 'ldap://co.ihc.com',
		baseDN        : 'dc=co,dc=ihc,dc=com',
		adUsersDomain : '@co.ihc.com'
	},
	servicenow:
	{
		baseurl: process.env.SERVICENOW_BASEURL,
		auth:
		{
			user: process.env.SERVICENOW_USER,
			pass: process.env.SERVICENOW_PASS
		},
		defaults:
		{
			proxy: process.env.PROXY,
			agent: false
		}
	},
	appname   : 'thincidents',
	appHost   : process.env.HOSTNAME + '.co.ihc.com',
	appPort   : process.env.PORT,
	dbHost    : 'localhost',
	dbPort    : 27017,
	dbName    : (process.env.NODE_ENV === 'production')? 'incidents' : 'incidents-dev'
};

// Methods
// **********************************************************************************
config.setProperties = function (options)
{
	"use strict";

	// Extend / Overwrite defaults
	return _.extend(this, options);
};

// Export
// **********************************************************************************
module.exports = config;
