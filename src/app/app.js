var app = angular.module('homiefinder', 
[
	'ui.router',
	'homiefinder.home',
	'homiefinder.friends',
	'homiefinder.profile',
	'homiefinder.places',
	'homiefinder.register',
	'homiefinder.googleService',
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
			//resolve our google apis here?
		}
	})
})
.controller('appCtrl', ['$scope', '$timeout', '$rootScope', '$state', 'googleService', function($scope, $timeout, $rootScope, $state, googleService){

	if (navigator.geolocation) {
    	//get geolocation on app start up
  	}

  	//googleService.setGoogle(new google);


}])
.config(['$locationProvider', function($locationProvider){
	$locationProvider.hashPrefix('');
}]);