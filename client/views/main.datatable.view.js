
// Modules
var app = require('../app.js');

module.exports = Backbone.View.extend(
{
	initialize: function ()
	{
		"use strict";

		// Global Event Listeners
		this.listenTo(app.collections.Incidents, 'add', this.addIncident);
		this.listenTo(app.collections.Incidents, 'change', this.changeIncident);
		this.listenTo(app.collections.Incidents, 'remove', this.removeIncident);
		this.listenTo(app.events, 'clear:content', this.clear);

		// Render to DOM
		this.render();
	},

	render: function ()
	{
		"use strict";

		this.initializeDatatable();
		this.initializeFeatures();
		app.datatable.fnDraw();

		return this;
	},

	addIncident: function (inc)
	{
		"use strict";

		app.datatable.api().row.add(inc.toJSON()).draw();
	},

	changeIncident: function (inc)
	{
		"use strict";

		app.datatable.api().row(this.$('.dataTable tbody tr#' + inc.id)).data(inc.toJSON()).draw();
	},

	removeIncident: function (inc)
	{
		"use strict";

		app.datatable.api().row(this.$('.dataTable tbody tr#' + inc.id)).remove().draw();
	},

	initializeColumnMap: function ()
	{
		"use strict";

		var columnOrder =
		[
			'number',
			'sys_created_on',
			'description',
			'category',
			'subcategory',
			'state'
		];

		return _.map(columnOrder, function (name, i)
		{
			var obj =
			{
				mDataProp : (name === 'id')? '_id' : name,
				type      : name,
				title     : name
			};

			return obj;
		});
	},

	initializeDatatable: function ()
	{
		"use strict";

		var initializeColumnMap  = this.initializeColumnMap;

		app.datatable = this.$('table').dataTable(
		{
			data: app.collections.Incidents.toJSON(),
			columns: initializeColumnMap(),
			rowId: '_id',
			dom: 	"<'row'<'col-sm-5'li><'col-sm-2'><'col-sm-5'f>>" +
					"<'row'<'col-sm-12'tr>>" +
					"<'row'<'col-sm-5'i><'col-sm-7'p>>",
			aLengthMenu:
			[
				[10, 25, 100, -1],
				[10, 25, 100, 'All']
			],
			iDisplayLength: -1,
			language:
			{
				lengthMenu: '_MENU_',
				info: '_START_ - _END_ of _TOTAL_',
				infoFiltered: '<span class="DT_filtered"><i class="fa fa-filter"></i> Filtered</span>',
				search: ''
			},
			scrollX: true,
			search: {
				caseInsensitive: true,
				regex: true,
				smart: true
			}
		});
	},

	initializeFeatures: function ()
	{
		"use strict";

		$(app.datatable.api().settings()[0].aanFeatures.f).find('input[type=search]').attr('placeholder', 'Search');
		$(app.datatable.api().settings()[0].aanFeatures.l).find('select').attr('title', 'Display Count');
	},

	clear: function ()
	{
		"use strict";

		this.$el.remove();
		this.remove();
	}
});
