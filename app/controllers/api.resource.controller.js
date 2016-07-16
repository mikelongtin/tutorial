
// Modules
var config = require('../../config/config');
var _      = require('lodash');

// API Controller
module.exports = function (Model)
{
	"use strict";

	function getParamsFromQueryString (req)
	{
		var obj =
		{
			filter : {},
			select : {},
			sort   : {}
		};

		// Parse Query String
		_.each(req.query, function (val, prop)
		{
			if (prop === 'select')
			{
				_.each(val.split(','), function (name)
				{
					if (Model.schema.paths[name] !== undefined)
					{
						obj.select[name] = 1;
					}
				});
			}
			else if (prop === 'orderby')
			{
				_.each(val.split(','), function (name)
				{
					var sign = name.substr(0, 1);
					name = (sign === '-')? name.substr(1) : name;

					if (Model.schema.paths[name] !== undefined)
					{
						obj.sort[name] = (sign === '-')? -1 : 1;
					}
				});
			}
			else if (Model.schema.paths[prop] !== undefined)
			{
				obj.filter[prop] = val;
			}
		});

		return obj;
	}

	function setAttributes (req, isUpdate)
	{
		// Do not overwrite _id
		if (isUpdate && req.body._id !== undefined)
		{
			delete req.body._id;
		}

		// Attach a doc property for new items
		if (!req.doc)
		{
			req.doc = new Model(req.body);
		}
		else
		{
			_.each(req.body, function (val, key)
			{
				req.doc[key] = val;
			});
		}

		return req;
	}

	return {
		get : function (req, res)
		{
			var obj = getParamsFromQueryString(req);

			Model.find(obj.filter).select(obj.select).sort(obj.sort).exec(function (err, docs)
			{
				if (err)
				{
					return res.status(500).send(err);
				}

				res.status(200);
				res.json(docs);
			});
		},
		post : function (req, res)
		{
			req = setAttributes(req);
			req.doc.save(function (err)
			{
				if (err)
				{
					return res.status(500).send(err);
				}

				res.status(201);
				res.json(req.doc);
			});
		},
		cacheId : function (req, res, next)
		{
			// Middleware to retrieve a doc from the db
			Model.findById(req.params.id, function (err, doc)
			{
				if (err)
				{
					return res.status(500).send(err);
				}

				if (doc)
				{
					// Attach the retrieved doc to the request
					req.doc = doc;
					next();
				}
				else
				{
					res.status(404);
					res.send('Document not found.');
				}
			});
		},
		getById : function (req, res)
		{
			res.status(200).json(req.doc);
		},
		putById : function (req, res)
		{
			req = setAttributes(req, true);
			req.doc.save(function (err)
			{
				if (err)
				{
					return res.status(500).send(err);
				}

				res.status(200);
				res.json(req.doc);
			});
		},
		patchById : function (req, res)
		{
			req = setAttributes(req, true);
			req.doc.save(function (err)
			{
				if (err)
				{
					return res.status(500).send(err);
				}

				res.status(200);
				res.json(req.doc);
			});
		},
		deleteById : function (req, res)
		{
			req.doc.remove(function (err)
			{
				if (err)
				{
					return res.status(500).send(err);
				}

				res.status(204);
				res.send('Removed.');
			});
		}
	};
};