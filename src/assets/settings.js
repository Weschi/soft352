angular.module('homiefinder.settings', [])
.service('settings', function() {

	//root variable is responsible for uri requests. eg localhost or aws server
	var root = "";
	var environment = false;
	if(!!environment)
	{
		//server domain
		root = "127.0.0.1"; 
	}
	else
	{
		//localhost
		root = "http://localhost:8080/";
	}

		var register = root + 'register';

		var authenticate = root + 'auth';

		var friends = root + 'friends';

		var position = root + 'position';

		var places = root + 'places';
	
});