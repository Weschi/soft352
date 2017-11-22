var mongoose = require('mongoose');
var FriendRequest = new mongoose.Schema({
	fromId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	toId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
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

module.exports = mongoose.model('FriendRequest', FriendRequest);