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
	'ngCookies'
])
.config(function($stateProvider){
$stateProvider.state('homiefinder', {
	url: '',
	controller: 'appCtrl'
	})
})
.controller('appCtrl', ['$scope', '$timeout', '$rootScope', '$state', 'googleService', '$cookies', 'userService', function($scope, $timeout, $rootScope, $state, googleService, $cookies, userService){
	$rootScope.token = !!$cookies.get('globals');

	$scope.logout = function() {
		userService.logout();
	};

	 var socket = io.connect();
 $scope.send = function(){
  socket.emit('chat message', $scope.message);
  $scope.message="";
 }
 socket.on('chat message', function(msg){
  var li=document.createElement("li");
  li.appendChild(document.createTextNode(msg));
  //document.getElementById("messages").appendChild(li);
  });
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