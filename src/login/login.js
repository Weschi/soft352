var app = angular.module('login', 
[
	'ui.router'
])
.config(function($stateProvider){
$stateProvider.state('loginCtrl', {
	url: '/login',
	controller: 'loginCtrl',
		resolve: {
			//resolve our google apis here?
		}
	})
})
.controller('appCtrl', ['$scope', function($scope){

}])