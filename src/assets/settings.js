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


	//when adding a new endpoint, a developer should amend these sections
	var userRoute = {
		login : root + 'login',
		register : root + 'register',
		users : root + 'users'
	}

	var friendRoute = {
		friends : root + 'friends'
	}
	
	var placeRoute = {
		places : root + 'places'		
	}

	//misc endpoint addresses that dont necessarily belong to any route
	var misc = {
		position : root + 'position'
	}

	return {
		userRoute,
		friendRoute,
		placeRoute,
		misc
	};
});