var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
module.exports = function(app, passport) {
	//All endpoints here will be prefixed with /login
app.use(passport.initialize());
	app.get('/', function(request, response){
		//response.sendFile(path.resolve(__dirname + '/../login.html'));
		//response.sendFile(__dirname + "/../index.html");
	});


	app.post('/login', function(request, response) {
	  passport.authenticate('local', function(err, user, info){
		    var token;

		    // If Passport throws/catches an error
		    if (err) {
		      response.status(404).json(err);
		      return;
		    }

		    // If a user is found
		    if(user){
		      token = user.generateJwt();
		      response.status(200);
		      response.json({
		        "token" : token
		      });
		    } else {
		      // If user is not found
		      response.status(401).json(info);
		    }
		})(request, response);
	});

	app.post('/register', function(request, response) {
	  var user = new User();

	  user.name = request.body.fullName;
	  user.email = request.body.email;

	  user.setPassword(request.body.password);

	  user.save(function(err) {
	    var token = user.generateJwt();
	    response.status(200);
	    response.json({
	      "token" : token
	    });
	  });
	  //response.sendFile(__dirname + "/index.html");
	  //response.send("get auth post requested");
	});
};