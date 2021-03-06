var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Notification = mongoose.model('Notification');
var jwt = require('express-jwt');
var Meeting = mongoose.model('Meeting');
var ObjectId = mongoose.Schema.Types.ObjectId;
module.exports = function(app, passport, _, io, notificationFactory) {
	//Endpoint for creating a friend request. Takes the recipient's id in query request and requster's in the uri
	app.post('/notification/:userId/create', function(request, response){
		var reqBody = request.body;
		//get from guy
		User.findById(reqBody.userId, function(err, fromUser){
			User.findById(reqBody.toId, function(err, toUser){
				var data = {
					description: reqBody.description,
					email: fromUser.email
				}
				var notification = notificationFactory.create(reqBody.type, null, fromUser.id, toUser.id, data);

				notification.save(function(error){
					response.status(200);
					io.sockets.in(notification.toId.toString()).emit('notification', notification);
					response.json({notification : notification});
				});
			});
		});
	});

	//Endpoint for accepting a friend request. Takes the recipient's id in query request and requster's in the uri
	app.put('/users/:userId/notification/:notificationId/accept', function(request, response){
		var params = request.params;
		Notification.findById(params.notificationId, function(error, notification){

			notification.status = 2;
			switch(notification.type)
			{
				case('FRIENDREQUEST'):
					var fromUser = notification.fromId;
					var toUser = notification.toId;
					fromUser.friends.push(toUser._id.toString());
					toUser.friends.push(fromUser._id.toString());
					//accepted, so add as friends
					fromUser.save(function(error){
						toUser.save(function(error){
							notification.save(function(error){
								response.status(200); 
								response.json(notification);
							});
						});
					});
				break;
				case('MEETINGREQUEST'):
					//create misc notification to inform bloke user has accepted
					var acceptNotif = new Notification({
						fromId : notification.toId,
						toId : notification.fromId,
						type : 'MISC',
						description : notification.toId.email + ' is going to your meeting, '+ notification.meeting.name +'.',
						status: 1
					});
					acceptNotif.save(function(error){
						if(!!error) 
						{
							response.status(500);
							response.json(error);
						}
					});
					notification.save(function(){
						response.status(200); 
						response.json(notification);
					});
				break;
				case('MISC'):
					notification.save(function(){
						response.status(200); 
						response.json(notification);
					});
				break;
			};

		}).populate('fromId').populate('toId').populate('meeting');
	});

	//Endpoint for declining a friend request. Takes the recipient's id in query request and requster's in the uri
	app.put('/users/:userId/notification/:notificationId/decline', function(request, response){
		Notification.findById(request.params.FriendRequestId, function(error, Notification){
			Notification.status = 3;
			Notification.save(function(error){
				response.status(200);
				response.json(Notification);
			});
		}).populate('fromId').populate('toId');
	});

	//this will be expanded upon for meetings
	//Endpoint for returning all the friend requests associated with a user as well as the user data
	app.get('/notifications/:userId', function( request, response) {
		var userId = request.params.userId;

		if(!userId)
		{
			response.status(400).json({});
		}
		var fr = Notification.find({toId : userId, status : 1}, function(error, Notifications){
			//join to users and get the email
			if(error)
			{
				response.send(error);
			}
			response.status(200);
			response.json(Notifications);
		}).sort('-date').populate('fromId').populate({path: 'meeting', populate: {path: 'user',model: 'User'}}).sort();
	});
};