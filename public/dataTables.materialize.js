
// DataTables MaterializeCSS 0.97.3 integration

(function(window, document, undefined)
{
	var factory = function( $, DataTable )
	{
		"use strict";

		// Set the defaults for DataTables initialization
		$.extend( true, DataTable.defaults,
		{
			dom:
				"<'row'<'col s6'l><'col s6'f>>" +
				"<'row'<'col s12'tr>>" +
				"<'row'<'col s5'i><'col s7'p>>",
			renderer: 'materialize'
		});

		// Default class modification
		$.extend( DataTable.ext.classes,
		{
			sWrapper:      "dataTables_wrapper dt-materialize",
			sFilterInput:  "form-control",
			sLengthSelect: "form-control"
		});

		// Paging button renderer
		DataTable.ext.renderer.pageButton.materialize = function ( settings, host, idx, buttons, page, pages )
		{
			var api     = new DataTable.Api( settings );
			var classes = settings.oClasses;
			var lang    = settings.oLanguage.oPaginate;
			var btnDisplay, btnClass, counter=0;

			var attach = function( container, buttons )
			{
				var i, ien, node, button;
				var clickHandler = function ( e )
				{
					e.preventDefault();
					if ( !$(e.currentTarget).hasClass('disabled') )
					{
						api.page( e.data.action ).draw( 'page' );
					}
				};

				for ( i=0, ien=buttons.length ; i<ien ; i++ )
				{
					button = buttons[i];

					if ( $.isArray( button ) )
					{
						attach( container, button );
					}
					else
					{
						btnDisplay = '';
						btnClass = '';

						switch ( button )
						{
							case 'ellipsis':
								btnDisplay = '&hellip;';
								btnClass = 'disabled';
								break;

							case 'first':
								btnDisplay = lang.sFirst;
								btnClass = button + (page > 0 ?
									'' : ' disabled');
								break;

							case 'previous':
								btnDisplay = lang.sPrevious;
								btnClass = button + (page > 0 ?
									'' : ' disabled');
								break;

							case 'next':
								btnDisplay = lang.sNext;
								btnClass = button + (page < pages-1 ?
									'' : ' disabled');
								break;

							case 'last':
								btnDisplay = lang.sLast;
								btnClass = button + (page < pages-1 ?
									'' : ' disabled');
								break;

							default:
								btnDisplay = button + 1;
								btnClass = page === button ?
									'active' : '';
								break;
						}

						if ( btnDisplay )
						{
							node = $('<li>',
								{
									'class': classes.sPageButton+' '+btnClass,
									'id': idx === 0 && typeof button === 'string' ?
										settings.sTableId +'_'+ button :
										null
								})
								.append( $('<a>',
								{
										'href': '#',
										'aria-controls': settings.sTableId,
										'data-dt-idx': counter,
										'tabindex': settings.iTabIndex
								})
								.html( btnDisplay )
							)
								.appendTo( container );

							settings.oApi._fnBindAction( node, { action: button }, clickHandler );

							counter++;
						}
					}
				}
			};

			// IE9 throws an 'unknown error' if document.activeElement is used
			// inside an iframe or frame. 
			var activeEl;

			try
			{
				// Because this approach is destroying and recreating the paging
				// elements, focus is lost on the select button which is bad for
				// accessibility. So we want to restore focus once the draw has
				// completed
				activeEl = $(host).find(document.activeElement).data('dt-idx');
			}
			catch (e)
			{

			}

			attach(
				$(host).empty().html('<ul class="pagination"/>').children('ul'),
				buttons
			);

			if ( activeEl )
			{
				$(host).find( '[data-dt-idx='+activeEl+']' ).focus();
			}
		};

	}; // /factory


	// Define as an AMD module if possible
	if ( typeof define === 'function' && define.amd )
	{
		define( ['jquery', 'datatables'], factory );
	}
	else if ( typeof exports === 'object' )
	{
	    // Node/CommonJS
	    factory( require('jquery'), require('datatables') );
	}
	else if ( jQuery )
	{
		// Otherwise simply initialise as normal, stopping multiple evaluation
		factory( jQuery, jQuery.fn.dataTable );
	}


})(window, document);
