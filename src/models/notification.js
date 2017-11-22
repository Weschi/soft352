var mongoose = require('mongoose');
var Notification = new mongoose.Schema({
	userId: {
		type: String,
		required: true
	},
	type: {
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


/*  
	type enum: 
	1 = meeting
	2 = friend
*/

module.exports = mongoose.model('FriendRequest', FriendRequest);