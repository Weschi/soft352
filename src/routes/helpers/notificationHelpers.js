var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Notification = mongoose.model('Notification');
var Meeting = mongoose.model('Meeting');
var moment = require('moment');
module.exports = {

    meetingNotify:function(meeting, notifType) {
    	var invited = meeting.invited;
    	for(var i = 0; i < invited.length; i++)
    	{
    		
    	}
    }
};