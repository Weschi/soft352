var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var FriendRequest = mongoose.model('FriendRequest');
var jwt = require('express-jwt');
module.exports = function(app, passport, _, io) {

	//login a user
	app.post('/login', function(request, response){
		passport.authenticate('local', function(err, user, info){
		    var token;
		    // If Passport throws/catches an error
		    if (err) 
		    {
		      response.status(500).json(err);
		      return;
		    }
		    // If a user is found
		    if(user)
		    {
		      token = user.generateJwt();
		      response.status(200);
		      response.json({
		        "token" : token,
		        user: user
		      });
		    } 
		    else 
		    {
		      // If user is not found
		      response.status(500).json(info);
		    }
		})(request, response);
	});

	//register a user
	app.post('/register', function(request, response){
		var user = new User();

		user.name = request.body.fullName;
		user.email = request.body.email;

		user.setPassword(request.body.password);

		user.save(function(err) {
			var token = user.generateJwt();
			response.status(200);
			response.json({
				"token" : token,
				user: user
			});
		});
	});

	//gets all users in the db
	app.get('/users', function(request, response){
		mongoose.connection.db.collection("users", function(err, schema){
			schema.find({}).toArray(function(err, data){
				var users = _.map(data, function(user){
					var user = _.pick(user, ['_id', 'name', 'email']);
					user._id = user._id.toString();
					return user;
				});
				if(!!users.length)
				{
					response.status(200);
					response.json(users);
				}
			});
		});
	});

	//Endpoint for creating a friend request. Takes the recipient's id in query request and requster's in the uri
	app.post('/friendRequest/:userId/create', function(request, response){
		var friendRequest = new FriendRequest();
		var reqBody = request.body;
		//get from guy
		User.findById(reqBody.userId, function(err, fromUser){
			friendRequest.fromId = fromUser._id;
			//get to guy for joining later
			User.findById(reqBody.toId, function(err, toUser){
				friendRequest.toId = toUser._id;

				//creating so it is pending
				friendRequest.status = 1;
				friendRequest.description = 'Friend request from ' + fromUser.email;
				friendRequest.save(function(error){
					response.status(200);
					io.sockets.in(friendRequest.toId.toString()).emit('friendRequest', friendRequest);
					response.json({friendRequest : friendRequest});
				});
			});
		});
	});

	//Endpoint for accepting a friend request. Takes the recipient's id in query request and requster's in the uri
	app.put('/users/:userId/friendRequest/:friendRequestId/accept', function(request, response){
		var params = request.params;
		FriendRequest.findById(params.friendRequestId, function(error, friendRequest){
				
			var fromUser = friendRequest.fromId;
			var toUser = friendRequest.toId;		

			fromUser.friends.push(toUser._id);
			toUser.friends.push(fromUser._id);

			friendRequest.status = 2;

			friendRequest.save(function(){
				fromUser.save(function(){
					toUser.save(function(){
						response.status(200);
						response.json(friendRequest);
					});
				});
			});

		}).populate('fromId').populate('toId');
	});

	//Endpoint for declining a friend request. Takes the recipient's id in query request and requster's in the uri
	app.put('/users/:userId/friendRequest/:friendRequestId/decline', function(request, response){
		FriendRequest.findById(request.params.friendRequestId, function(error, friendRequest){
			friendRequest.status = 3;
			friendRequest.save(function(error){
				response.status(200);
				response.json(friendRequest);
			});
		}).populate('fromId').populate('toId');
	});

	//Endpoint for returning all the friend requests associated with a user as well as the user data
	app.get('/friendRequest/:userId', function(request, response){
		var fr = FriendRequest.find({toId : request.body.userId}, function(error, friendRequests){
			if(error)
			{
				response.send(error);
			}

			if(!!friendRequests.length)
			{
				response.status(200);
				response.json(friendRequests);
			}
		});
	});


	//this will be expanded upon for meetings
	//Endpoint for returning all the friend requests associated with a user as well as the user data
	app.get('/notifications/:userId', function(request, response){
		var userId = request.params.userId;

		if(!userId)
		{
			response.status(400).json({});
		}

		var fr = FriendRequest.find({toId : userId, status : 1}, function(error, friendRequests){
			//join to users and get the email
			if(error)
			{
				response.send(error);
			}
			response.status(200);
			response.json(friendRequests);
		}).sort('-date').populate('fromId').sort();
	});

	//notification, type 1 = friend request, type 2 = meeting

	//get friends
	app.get('/user/:userId/friends', function(request, response){
		var userId = request.params.userId;
		User.find({_id: userId}, function(error, user){
			response.status(200);
			response.json(user.friends);
		}).populate('friends');
	});

	app.get('/user/:userId/friends/:friendId/remove', function(request, response){
		var userId = request.params.userId;
		User.find({_id: userId}, function(error, user){
			_.remove(user.friends, function(friend){ friend._id == request.params.friendId});
			user.save(function(error){
				if(!error)
				{
					response.status(200);
					response.json(user.friends);
				}
			});
		}).populate('friends');
	});



};