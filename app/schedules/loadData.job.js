
// Modules
// **********************************************************************************
var config     = require('../../config/config');
var schedule   = require('node-schedule');
var Promise    = require('bluebird');
var log4js     = require('log4js');
var _          = require('lodash');

// Initialize
// **********************************************************************************
var servicenow  = require('servicenow-api')(config.servicenow);
var log         = log4js.getLogger('data loading');

function dateFilter (verb, period)
{
	"use strict";
	
	var verbs =
	{
		created : 'sys_created_on',
		updated : 'sys_updated_on'
	};

	var periods =
	{
		today    : 'Today@javascript:gs.daysAgoStart(0)@javascript:gs.daysAgoEnd(0)',
		thisYear : 'This year@javascript:gs.beginningOfThisYear()@javascript:gs.endOfThisYear()'
	};

	return (verbs[verb] && periods[period])? verbs[verb] + 'ON' + periods[period] : '';
}

function incidentFilter ()
{
	"use strict";
	
	var filters =
	{
		sysparm_query:
		[
			'short_descriptionLIKEtelehealth',
			'ORshort_descriptionLIKEteleservice',
			'ORshort_descriptionLIKEtelecritical',
			'ORshort_descriptionLIKEtelestroke',
			'ORshort_descriptionLIKEneonatal'
		]
	};
	
	return _.map(filters, function (val, key)
	{
		return key + '=' + val.join('^');
	}).join('^');
}

function locationFilter ()
{
	"use strict";
	
	var filters =
	{
		sysparm_query:
		[
			'ORDERBYfull_name'
		],
		sysparm_fields:
		[
			'sys_id,full_name,name,u_location_type,number,country,state,city'
		]
	};
	
	return _.map(filters, function (val, key)
	{
		return key + '=' + val.join('^');
	}).join('^');
}

function setAliases (obj, options)
{
	"use strict";

	return _.mapKeys(obj, function (value, key)
	{
		return options[key] || key;
	});
}

function loadData (period)
{
	"use strict";

	// Add Incidents
	return Promise.resolve().then(function ()
	{
		var Model = config.connection.model('Incidents');
		
		return servicenow.tableAPI.incidents.find(incidentFilter() + '^' + dateFilter('created', period)).then(function (data)
		{
			return Promise.map(data, function (item)
			{
				item = setAliases(item, { 'sys_id': '_id' });

				return Model.findOne({ _id: item._id }, function (err, doc)
				{
					if (err)
					{
						throw err;
					}

					if (!doc)
					{
						log.info('Adding ' + item.number);
						doc = new Model(item);
						doc.save();
					}
				});
			});
		});
	})
	// Update Incidents
	.then(function ()
	{
		var Model  = config.connection.model('Incidents');
		
		return servicenow.tableAPI.incidents.find(incidentFilter() + '^' + dateFilter('updated', period)).then(function (data)
		{
			return Promise.map(data, function (item)
			{
				item = setAliases(item, { 'sys_id': '_id' });

				return Model.findOne({ _id: item._id }, function (err, doc)
				{
					if (err)
					{
						throw err;
					}

					if (doc)
					{
						log.info('Updating ' + item.number);
						doc = _.extend(doc, item);
						doc.save();
					}
				});
			});
		});
	})
	// Add Locations
	.then(function ()
	{
		var Model = config.connection.model('Locations');
		
		return servicenow.tableAPI.locations.find(locationFilter() + '^' + dateFilter('created', period)).then(function (data)
		{
			return Promise.map(data, function (item)
			{
				item = setAliases(item, { 'sys_id': '_id' });

				return Model.findOne({ _id: item._id }, function (err, doc)
				{
					if (err)
					{
						throw err;
					}

					if (!doc)
					{
						log.info('Adding ' + item.number);
						doc = new Model(item);
						doc.save();
					}
				});
			});
		});
	})
	// Updating Locations
	.then(function ()
	{
		var Model = config.connection.model('Locations');
		
		return servicenow.tableAPI.locations.find(locationFilter() + '^' + dateFilter('updated', period)).then(function (data)
		{
			return Promise.map(data, function (item)
			{
				item = setAliases(item, { 'sys_id': '_id' });

				return Model.findOne({ _id: item._id }, function (err, doc)
				{
					if (err)
					{
						throw err;
					}

					if (doc)
					{
						log.info('Updating ' + item.number);
						doc = _.extend(doc, item);
						doc.save();
					}
				});
			});
		});
	})
	.catch(function (err)
	{
		throw err;
	});
}

// Export
// **********************************************************************************
module.exports = function ()
{
	"use strict";

	//loadData('thisYear');

	schedule.scheduleJob({ minute: 0 }, function ()
	{
		loadData('today');
	});
};
