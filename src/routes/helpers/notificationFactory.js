var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Notification = mongoose.model('Notification');
var Meeting = mongoose.model('Meeting');
var moment = require('moment');

	function createMeeting(meeting) {
    	var notification = new Notification();
    	notification.meeting = meeting.id;
		notification.description = meeting.name + ' meeting request.';
		notification.date = new Date();
		return notification;
    }

    function createFriendRequest(email) {
    	var notification = new Notification();
    	notification.description = 'Friend request from ' + email;
    	return notification;
    }

    function createMisc(description) {
    	var notification = new Notification();
		notification.description = description;
		return notification;
    }

module.exports = {

	create:function(type, meeting, fromId, toId, data) {
		var notification;
		switch(type)
		{
			case('MEETINGREQUEST'):
				notification = createMeeting(meeting);
			break;
			case('FRIENDREQUEST'):
				notification = createFriendRequest(data.email);
			break;
			case('MISC'):
				notification = createMisc(data.description);
			break;
		}

		notification.status = 1;
		notification.type = type;
		notification.fromId = fromId;
		notification.toId = toId;

		return notification;
    }
};