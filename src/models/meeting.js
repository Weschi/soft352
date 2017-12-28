var mongoose = require('mongoose');
var Meeting = new mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
	name: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		required: true
	},
	description: {
		type: String,
		required: false
	},
	place: {
		type:{
	        id:{type: Number, required: true}, //ID stored directly from google's api
	        name:{type: String},
	        latitude:{type: Number},
	        longitude:{type: Number}
    	}
	},
	invited: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notification'
    }],
	status: {
		type: Number,
		required: true 
	}
});

/*  
	meeting status: 
	1 = Scheduled
	2 = Started
	3 = Completed
	4 = Cancelled
*/

/*  
	invited status: 
	1 = Sent
	2 = Accepted
	3 = Declined
*/

module.exports = mongoose.model('Meeting', Meeting);