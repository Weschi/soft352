angular.module('homiefinder.settings', [])
.service('settings', function() {

	//root variable is responsible for uri requests. eg localhost or aws server
	var root = "";
	var environment = false;
	if(!!environment)
	{
		//server domain
		root = "http://192.168.43.3:8080/"; 
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
		users : root + 'users',
		query : root + 'users/query'
	}

	var notifications = {
		get : root + 'notifications/{{userId}}'
	}

	var friends = {
		get : root + 'user/{{userId}}/friends',
		delete : root + 'user/{{userId}}/friend/{{friendId}}/remove'	
	}

	var meetingRoute = {
		post : root + 'users/:userId/meeting/create',
		get : root + 'users/{{userId}}/meetings/get',
		delete : root + 'users/{{userId}}/meetings/{{meetingId}}/delete',
		put : root + 'users/{{userId}}/meetings/{{meetingId}}/put'
	};
	
	var friendRequestRoute = {
		create : root + 'friendRequest/{{userId}}/create',
		decline : root + 'users/{{userId}}/friendRequest/{{friendRequestId}}/decline',
		accept : root + 'users/{{userId}}/friendRequest/{{friendRequestId}}/accept',
		get : root + 'friendRequest/{{userId}}'
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
		friends,
		placeRoute,
		misc,
		friendRequestRoute,
		notifications,
		meetingRoute
	};
});