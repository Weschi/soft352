var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Notification = mongoose.model('Notification');
var jwt = require('express-jwt');
var ObjectId = mongoose.Schema.Types.ObjectId;
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

	
	//get friends
	app.get('/user/:userId/friends', function(request, response){
		User.findById(request.params.userId, function(error, user){
			response.status(200);
			response.json(user.friends);
		}).populate('friends');
	});

	app.delete('/user/:userId/friend/:friendId/remove', function(request, response){
		User.update({userId : request.params.userId}, {$pull:{"friends": { "id": ObjectId(request.params.friendId)}}}, function(error, data){
			response.status(200);
			response.json(data);
		});
	});

	app.get('/users/query', function(request, response){
		var params = request.query;
		//never ever return all the users at once
		User.find( {$or:[ {'name' : new RegExp('^'+params.query+'$', "i") }, {'email' : new RegExp('^'+params.query+'$', "i") }]}, function(err, users){
			response.status(200);
			response.json(users);
		});
	});
};