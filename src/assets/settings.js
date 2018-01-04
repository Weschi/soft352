angular.module('homiefinder.settings', [])
.service('settings', function() {

	//root variable is responsible for uri requests. eg localhost or aws server
	var root = "";
	var environment = true;
	if(!!environment)
	{
		//server domain
		root = ""; 
	}
	else
	{
		//localhost
		root = "http://localhost:8080/";
	}


	//when adding a new endpoint, a developer should amend these sections testtt
	var userRoute = {
		login : root + 'login',
		register : root + 'register',
		users : root + 'users',
		query : root + 'users/{{userId}}/query'
	}

	var notificationRoute = {
		get : root + 'notifications/{{userId}}',
		create : root + 'notification/{{userId}}/create',
		decline : root + 'users/{{userId}}/notification/{{notificationId}}/decline',
		accept : root + 'users/{{userId}}/notification/{{notificationId}}/accept'
	}

	var friends = {
		get : root + 'user/{{userId}}/friends',
		delete : root + 'user/{{userId}}/friend/{{friendId}}/remove'	
	}

	var meetingRoute = {
		post : root + 'users/{{userId}}/meeting/create',
		get : root + 'users/{{userId}}/meetings/get',
		delete : root + 'users/{{userId}}/meetings/{{meetingId}}/delete',
		put : root + 'users/{{userId}}/meetings/{{meetingId}}/put'
	};
	
	var placeRoute = {
		places : root + 'places'		
	}

	//misc endpoint addresses that dont necessarily belong to any route
	var misc = {
		position : root + 'position'
	}

	return {
		userRoute,
		friends,
		placeRoute,
		misc,
		notificationRoute,
		meetingRoute
	};
});