var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Notification = mongoose.model('Notification');
var Meeting = mongoose.model('Meeting');
var moment = require('moment');
var dateFormat = "DD-MM-YYYYTHH:mm";
module.exports = function(app, passport, _, io, scheduler, notificationFactory) {

	//create a meeting
	app.post('/users/:userId/meeting/create', function(request, response){
		var reqMeeting = request.body;
		var meeting = new Meeting();
		meeting.user = reqMeeting.userId;
		meeting.date = moment(reqMeeting.date, dateFormat).toDate(); //sort this, should be sent ready from the client side
		meeting.place = reqMeeting.place;
		meeting.name = reqMeeting.name;
		meeting.description = reqMeeting.description;
		meeting.status = 1; //scheduled
		_.each(reqMeeting.people, function(person){
			var notification = notificationFactory.create('MEETINGREQUEST', meeting, reqMeeting.userId, person)
			meeting.invited.push(notification.id);
			notification.save(function(error){				
			if(!!error)
			{
				response.status(400);
				response.json(error);
			}
			});
		});
		meeting.save(function(error){
			if(!error)
			{
				response.status(200);
				response.json(meeting);
			}
		});
	});

	//get all meetings for a user
	app.get('/users/:userId/meetings/get', function(request, response){
		var user = request.params.userId;
		Meeting.find({'user' : user }, function(error, meeting){
			if(!!meeting)
			{
				//I HATE THIS SLOW AND DIRTY QUERY USE THE AGGREGATE FRAMEWORK! I MISS JOINS
				Meeting.find({}, function(error, everyMeeting){
					_.each(everyMeeting, function(m){
						_.each(m.invited, function(n){
							if(n.toId.id === user)
							{
								meeting.push(m);
							}
						});
					});

					meeting = _.sortBy(meeting, function(m) {
						return m.date;
					});
					response.status(200);
					response.json(meeting);
				}).populate({path: 'invited', populate: {path: 'toId',  model: 'User'}}).populate('user');
			}
		}).sort('date').populate({path: 'invited', populate: {path: 'toId',  model: 'User'}}).populate('user').sort();
	});

	//create a meeting
	app.post('/users/:userId/meetings/:meetingId/delete', function(request, response){
		var adminId = request.params.userId;
		//pull all here
		Meeting.update({admin: adminId}, function(error, meeting){
			if(!!meeting)
			{
				response.status(200);
				response.json(meeting);
			}
		}).sort('-date').populate('people').sort();
	});

	//update - should auth this later
	app.put('/users/:userId/meetings/:meetingId/put', function(request, response){
		var reqMeeting = request.body.meeting;
		var meetingId = request.params.meetingId;
		Meeting.findById(meetingId, function(error, meeting){
			//you cant change the ownership of a meeting, but you can change date, name, place and people
			meeting.name = reqMeeting.name;
			meeting.date = moment(reqMeeting.date).toDate();
			meeting.place = reqMeeting.place;
			meeting.status = reqMeeting.status;
			meeting.save(function(error){
				response.status(200);
				response.json(meeting);
			});
		});
	});

	//Alter the status of a meeting
	app.put('/users/:userId/meetings/:meetingId/status', function(request, response){
		var meetingId = request.params.meetingId;
		var today = new Date();
		Meeting.findById(meetingId, function(error, meeting){
			if(meeting.date == today)
			{
				//in progress
				meeting.status = 2;
			}
			else if(meeting.date > today)
			{
				//complete
				meeting.status = 3; 
			}

			meeting.save(function(error){
				response.status(200);
				response.json(meeting);
			});	
		});
	});
	
};