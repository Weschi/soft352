var path = require('path');

module.exports = function(app, passport) {
	app.use(passport.initialize());
	app.get('/', function(request, response){
		response.sendFile(path.resolve(__dirname + '/../index.html'));
		//response.sendFile(__dirname + "/../index.html");
	});
};