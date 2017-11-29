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
	place: {
		type:{
	        id:{type: Number, required: true},
	        name:{type: String},
	        latitude:{type: Number},
	        longitude:{type: Number}
    	}
	},
	invited: [{
        status: Number,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
	status: {
		type: Number,
		required: true 
	}
});

/*  
	status enum: 
	1 = scheduled
	2 = In progress
	3 = Completed
	4 = Cancelled
*/
comment:{type:[{
            date:{type: Date,default: Date.now},
            userId:{type: String},
            content:{type: String}
          }]}
module.exports = mongoose.model('Meeting', Meeting);