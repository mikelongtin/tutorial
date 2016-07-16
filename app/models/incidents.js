
// Modules
// **********************************************************************************
var config   = require('../../config/config');
var mongoose = require('mongoose');

// Schema
var schema = new mongoose.Schema(
{
    '_id'                             : { type: String, unique: true },
    'parent'                          : { type: String },
    'u_vendor_name'                   : { type: String },
    'caused_by'                       : { type: mongoose.Schema.Types.Mixed },
    'u_resolution'                    : { type: String },
    'watch_list'                      : { type: String },
    'upon_reject'                     : { type: String },
    'sys_updated_on'                  : { type: Date   },
    'approval_history'                : { type: String },
    'skills'                          : { type: String },
    'number'                          : { type: String },
    'u_resolve_ci'                    : { type: mongoose.Schema.Types.Mixed },
    'current_impact'                  : { type: String },
    'state'                           : { type: String },
    'u_device_id'                     : { type: mongoose.Schema.Types.Mixed },
    'sys_created_by'                  : { type: mongoose.Schema.Types.Mixed },
    'knowledge'                       : { type: String },
    'order'                           : { type: String },
    'cmdb_ci'                         : { type: mongoose.Schema.Types.Mixed },
    'u_incident_type'                 : { type: String },
    'impact'                          : { type: String },
    'u_icentra_det'                   : { type: String },
    'active'                          : { type: String },
    'priority'                        : { type: String },
    'sys_domain_path'                 : { type: String },
    'u_resolved_other'                : { type: String },
    'u_resolved_ri'                   : { type: String },
    'business_duration'               : { type: Date   },
    'group_list'                      : { type: String },
    'u_problem_candidate'             : { type: String },
    'u_phi'                           : { type: String },
    'short_description'               : { type: String },
    'correlation_display'             : { type: String },
    'work_start'                      : { type: String },
    'additional_assignee_list'        : { type: String },
    'u_disaster'                      : { type: String },
    'notify'                          : { type: String },
    'sys_class_name'                  : { type: String },
    'closed_by'                       : { type: mongoose.Schema.Types.Mixed },
    'follow_up'                       : { type: String },
    'parent_incident'                 : { type: mongoose.Schema.Types.Mixed },
    'timeframe'                       : { type: String },
    'u_major_incident_notes'          : { type: String },
    'reassignment_count'              : { type: String },
    'u_other_symptom'                 : { type: String },
    'u_resolution_category'           : { type: String },
    'assigned_to'                     : { type: mongoose.Schema.Types.Mixed },
    'sla_due'                         : { type: String },
    'u_icentra_alert'                 : { type: String },
    'u_has_attachments'               : { type: String },
    'escalation'                      : { type: String },
    'upon_approval'                   : { type: String },
    'correlation_id'                  : { type: mongoose.Schema.Types.Mixed },
    'made_sla'                        : { type: String },
    'child_incidents'                 : { type: mongoose.Schema.Types.Mixed },
    'resolved_by'                     : { type: mongoose.Schema.Types.Mixed },
    'sys_updated_by'                  : { type: mongoose.Schema.Types.Mixed },
    'opened_by'                       : { type: mongoose.Schema.Types.Mixed },
    'user_input'                      : { type: String },
    'sys_created_on'                  : { type: Date   },
    'sys_domain'                      : { type: mongoose.Schema.Types.Mixed },
    'u_current_location'              : { type: String },
    'calendar_stc'                    : { type: String },
    'closed_at'                       : { type: Date   },
    'business_service'                : { type: String },
    'u_resolved_by_ri'                : { type: mongoose.Schema.Types.Mixed },
    'u_symptom'                       : { type: String },
    'rfc'                             : { type: String },
    'time_worked'                     : { type: Date   },
    'expected_start'                  : { type: String },
    'opened_at'                       : { type: Date   },
    'u_tags'                          : { type: String },
    'work_end'                        : { type: String },
    'caller_id'                       : { type: mongoose.Schema.Types.Mixed },
    'resolved_at'                     : { type: Date   },
    'u_preferred_contact_information' : { type: String },
    'subcategory'                     : { type: String },
    'close_code'                      : { type: String },
    'assignment_group'                : { type: mongoose.Schema.Types.Mixed },
    'business_stc'                    : { type: String },
    'description'                     : { type: String },
    'calendar_duration'               : { type: Date   },
    'close_notes'                     : { type: String },
    'situation_appraisal'             : { type: String },
    'contact_type'                    : { type: String },
    'incident_state'                  : { type: String },
    'urgency'                         : { type: String },
    'problem_id'                      : { type: mongoose.Schema.Types.Mixed },
    'u_major_incident_stage'          : { type: String },
    'u_phi_data'                      : { type: String },
    'u_misrouteinc'                   : { type: String },
    'activity_due'                    : { type: String },
    'severity'                        : { type: String },
    'comments'                        : { type: String },
    'u_vendor_tick_num'               : { type: String },
    'approval'                        : { type: String },
    'due_date'                        : { type: String },
    'sys_mod_count'                   : { type: String },
    'reopen_count'                    : { type: String },
    'sys_tags'                        : { type: String },
    'u_travel_required'               : { type: String },
    'u_resolution_subcategory'        : { type: String },
    'future_impact'                   : { type: String },
    'location'                        : { type: String },
    'category'                        : { type: String }
}, 
{ collection: 'incidents' });

// Module Export
// **********************************************************************************
module.exports = config.connection.model('Incidents', schema, 'incidents');

// ALL EVENTS WILL OCCUR FOR EACH SOCKET
// **********************************************************************************
module.exports.loadEventEmitter = function (io, socket)
{
	'use strict';

	// The POST event processes after the change has been commited to the DB
	schema.post('save', function (doc)
	{
		// Emits to all connected sockets except the one that initiated the event
		socket.emit('updated-incident', doc);
	});
};