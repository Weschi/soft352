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
			}
		}
	})
})
.controller('appCtrl', ['$scope', '$timeout', '$rootScope', '$state', 'googleService', '$cookies', 'userService', 'user', 'notifications', function($scope, $timeout, $rootScope, $state, googleService, $cookies, userService, user, notifications){
	
	$rootScope.token = !!$cookies.get('globals');
	$rootScope.notifications = notifications;

	$rootScope.logout = function() {
		userService.logout();
	};


	if($rootScope.token)
	{
		var socket = io.connect();
	
		if(!!user._id)
		{
			socket.emit('join', {id : user._id});
		}

		$rootScope.acceptRequest = function(notification){
			var params = {
				userId : user._id,
				friendRequestId : notification._id
			};
			userService.acceptFriendRequest(params).then(function(data){
				Materialize.toast(notification.toId.email + ' added as a friend.', 2000);
				$state.reload();
			});
		};

		$rootScope.declineRequest = function(notification){
			var params = {
				userId : user._id,
				friendRequestId : notification._id
			};
			userService.declineFriendRequest(params).then(function(data){
				Materialize.toast('Friend request from ' + notification.toId.email + ' declined.', 2000);
				$state.reload();
			});
		};

		socket.on('friendRequest', function(friendRequest){
			console.log("friendRequest retrieved");
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