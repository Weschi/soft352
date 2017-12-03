var mongoose = require('mongoose');
var Notification = new mongoose.Schema({
	type: {
		type: String,
		enum : ['NONE', 'FRIENDREQUEST', 'MEETINGREQUEST', 'MISC'],
		default: 'NONE',
		required: true
	},
	fromId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	toId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	meeting: {type: mongoose.Schema.Types.ObjectId, ref: 'Meeting'},
	status: {
		type: Number,
		required: true 
	},
	date: {type: Date, default: Date.now},
	description: {type: String, required: false}
});

/*  
	status enum: 
	1 = pending
	2 = accepted
	3 = deleted
*/

module.exports = mongoose.model('Notification', Notification);