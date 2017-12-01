var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var FriendRequest = mongoose.model('FriendRequest');
var Meeting = mongoose.model('Meeting');
var moment = require('moment');
var dateFormat = "DD-MM-YYYYTHH:mm";
module.exports = function(app, passport, _, io) {

	//create a meeting
	app.post('/users/:userId/meeting/create', function(request, response){
		var reqMeeting = request.body;
		console.log(moment());
		var meeting = new Meeting();
		meeting.user = reqMeeting.userId;
		meeting.date = moment(reqMeeting.date, dateFormat).toDate(); //sort this, should be sent ready from the client side
		meeting.place = reqMeeting.place;
		meeting.name = reqMeeting.name;
		meeting.description = reqMeeting.description;
		_.each(reqMeeting.people, function(person){
			meeting.invited.push({
				user: person,
				status: 1 //invited
			});
		});
		meeting.status = 1; //scheduled
		meeting.save(function(error){
			if(!error)
			{
				response.status(200);
				response.json(meeting);
			}
			else
			{
				response.status(500);
				response.json(error);
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
		}).populate('user').populate('invited.user');
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
		}).populate('people');
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