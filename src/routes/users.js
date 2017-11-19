var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var FriendRequest = mongoose.model('FriendRequest');
var jwt = require('express-jwt');
module.exports = function(app, passport, _) {

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

	app.get('/users', function(request, response){
		mongoose.connection.db.collection("users", function(err, schema){
			schema.find({}).toArray(function(err, data){
				var users = _.map(data, function(user){
					return _.pick(user, ['name', 'email']);
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
	app.get('/friendRequest/:userId/create', function(request, response){
		var friendRequest = new FriendRequest();
		
	});

	//Endpoint for accepting a friend request. Takes the recipient's id in query request and requster's in the uri
	app.put('/friendRequest/:userId/accept', function(request, response){
		
	});

	//Endpoint for declining a friend request. Takes the recipient's id in query request and requster's in the uri
	app.put('/friendRequest/:userId/decline', function(request, response){
		
	});
};