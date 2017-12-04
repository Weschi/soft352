var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Notification = mongoose.model('Notification');
var Meeting = mongoose.model('Meeting');
var moment = require('moment');
var dateFormat = "DD-MM-YYYYTHH:mm";
module.exports = function(app, passport, _, io, scheduler) {

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
			var notification = new Notification();
			meeting.invited.push(notification.id);
			notification.meeting = meeting.id;
			notification.type = 'MEETINGREQUEST';
			notification.status = 1;
			notification.fromId = reqMeeting.userId;
			notification.toId = person;
			notification.description = meeting.name + ' meeting request.';
			notification.date = new Date();
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
				scheduler.scheduleStartMeeting(meeting, meeting.date);
				response.status(200);
				response.json(meeting);
			}
		});
	});

	//create a meeting
	app.get('/users/:userId/meetings/get', function(request, response){
		var user = request.params.userId;
		Meeting.find({user: user}, function(error, meeting){
			if(!!meeting)
			{
				response.status(200);
				response.json(meeting);
			}
		}).sort('date').populate({path: 'invited', populate: {path: 'toId', model: 'User'}}).populate('user').sort();
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

	//create a meeting
	app.put('/users/:userId/meetings/:meetingId/put', function(request, response){
		var reqMeeting = request.body;
		var meetingId = request.params.meetingId;
		Meeting.findById(meetingId, function(error, meeting){
			//you cant change the ownership of a meeting, but you can change date, name, place and people
			meeting.name = reqMeeting.name;
			meeting.date = reqMeeting.date;
			meeting.place = reqMeeting.place;
			meeting.people = [];
			_.each(reqMeeting.people, function(person){
				meeting.people.push(person);
			});

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