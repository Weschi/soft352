var mongoose = require('mongoose');
var FriendRequest = new mongoose.Schema({
	fromId: {
		type: String,
		required: true
	},
	toId: {
		type: String,
		required: true
	},
	status: {
		type: Number,
		required: true 
	}
});

/*  
	status enum: 
	1 = pending
	2 = accepted
	3 = deleted
*/

module.exports = mongoose.model('FriendRequest', FriendRequest);