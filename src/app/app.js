var app = angular.module('homiefinder', 
[
	'ui.router',
	'homiefinder.home',
	'homiefinder.friends',
	'homiefinder.profile',
	'homiefinder.places',
	'homiefinder.users',
	'homiefinder.googleService',
	'homiefinder.settings',
	'homiefinder.ajaxResource',
	'homiefinder.friendService',
	'homiefinder.messageService',
	'homiefinder.userService',
	'homiefinder.meetingService',
	'homiefinder.meetings',
	'homiefinder.map',
	'homiefinder.socket',
	'LocalForageModule',
	'ngCookies',
	'ui.materialize'
])
.config(function($stateProvider){
$stateProvider.state('homiefinder', {
		url: '',
		abstract: true,
		controller: 'appCtrl',
		resolve: {
			user : function(userService) {
				return userService.getUser().then(function(user){
					return user;
				});
			},
			notifications : function(userService, user) {
				if(!!user)
				{		
					return userService.getNotifications({userId: user._id}).then(function(notifications){
						return notifications;
					});
				}
				else
				{
					return [];
				}
			},
			friends : function(userService, user) {
				if(!!user)
				{		
					return userService.getFriends({userId: user._id.toString()}).then(function(friends){
						return friends;
					});
				}
				else
				{
					return null;
				}
			}
		}
	});
})
.controller('appCtrl', ['$scope', '$timeout', '$rootScope', '$state', 'googleService', '$cookies', 'userService', 'user', 'notifications', '$interval', 'friends', function($scope, $timeout, $rootScope, $state, googleService, $cookies, userService, user, notifications, $interval, friends){
	
	$rootScope.token = !!$cookies.get('globals');
	$rootScope.notifications = notifications;
	$rootScope.controls = {
		user: user
	};
	$rootScope.logout = function() {
		userService.logout();
	};

	if($rootScope.token)
	{
		var socket = io.connect();
	
		if(!!user._id)
		{
			//join my own room
			socket.emit('join', {id : user._id});
		}

		if(!!friends)
		{
			//join my friend's room
			_.each(friends, function(friend){
				//listen to friend rooms
				socket.emit('join', {id: friend._id});
			});
		}

		$rootScope.acceptRequest = function(notification){
			var params = {
				userId : user._id,
				notificationId : notification._id
			};
			userService.acceptRequest(params).then(function(data){
				if(notification.type == 'FRIENDREQUEST')
				{
					Materialize.toast(notification.fromId.email + ' added as a friend.', 2000);
				}
				$state.reload();
			});	
		};

		$interval(function() {
			if(navigator.onLine)
			{
				navigator.geolocation.getCurrentPosition(function(response){

					//broadcast to all the friend channels we've joined
					_.each(friends, function(friend){
						socket.emit('location', {coords : {latitude: response.coords.latitude, longitude: response.coords.longitude}, userId: user._id})
					});

					//socket.emit('location', {coords : {latitude: response.coords.latitude, longitude: response.coords.longitude}, userId: user._id});
				}, function(error){

				});
			}
		}, 60000)

		$rootScope.declineRequest = function(notification){
			userService.declineRequest({notificationId : notification._id}).then(function(data){
				Materialize.toast('Notification removed.', 2000);
				$state.reload();
			});
		};

		socket.on('friendRequest', function(friendRequest){
			$rootScope.notifications.push(friendRequest);
		});
	}
}])
.config(['$localForageProvider',  '$locationProvider', function($localForageProvider, $locationProvider){
	$locationProvider.hashPrefix('');

    $localForageProvider.config({
        driver      : 'localStorageWrapper', // if you want to force a driver
        name        : 'myApp', // name of the database and prefix for your data, it is "lf" by default
        version     : 1.0, // version of the database, you shouldn't have to use this
        storeName   : 'keyvaluepairs', // name of the table
        description : 'some description'
    });
}]);