var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var jwt = require('express-jwt');

	var auth = jwt({
	  secret: 'MY_SECRET',
	  userProperty: 'payload'
	});
	//All endpoints here will be prefixed with /login
	//app.use(passport.initialize());

	module.exports.login = function(request, response) {
	  passport.authenticate('local', function(err, user, info){
		    var token;

		    // If Passport throws/catches an error
		    if (err) {
		      response.status(500).json(err);
		      return;
		    }

		    // If a user is found
		    if(user){
		      token = user.generateJwt();
		      response.status(200);
		      response.json({
		        "token" : token,
		        user: user
		      });
	    	//response.redirect('../app/profile/public.tpl.html');
		    } else {
		      // If user is not found
		      response.status(500).json(info);
		    }
		})(request, response);
	};

	module.exports.register = function(request, response) {
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
	    //response.redirect('../app/profile/public.tpl.html');
	  });
	  //response.sendFile(__dirname + "/index.html");
	  //response.send("get auth post requested");
	};