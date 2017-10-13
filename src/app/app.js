var app = angular.module('homiefinder', 
[
	'ui.router',
	'homiefinder.home',
	'homiefinder.friends',
	'homiefinder.profile',
	'homiefinder.places',
	'homiefinder.register',
	'homiefinder.positionService',
	'homiefinder.settings',
	'homiefinder.ajaxResource',
	'homiefinder.friendService',
	'homiefinder.messageService',
	'homiefinder.friendService'
])
.config(function($stateProvider){
$stateProvider.state('homiefinder', {
	url: '',
	abstract: true,
	controller: 'appCtrl',
		resolve: {

		}
	})
})
.controller('appCtrl', ['$scope', '$timeout', '$rootScope', '$state', function($scope, $timeout, $rootScope, $state){

	if (navigator.geolocation) {
    	//get geolocation on app start up
  	}

}])
.config(['$locationProvider', function($locationProvider){
	$locationProvider.hashPrefix('');
}]);