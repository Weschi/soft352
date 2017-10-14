angular.module('homiefinder.profile', ['ui.router', 'homiefinder.googleService'])
.config(function($stateProvider){
  $stateProvider
  .state('homiefinder.profile', {
  	name: 'profile',
    url: '/profile',
    templateUrl: 'app/profile/profile.tpl.html',
    controller: 'profileCtrl',
    resolve: {
      position: function(googleService) {
        return googleService.getLocation().then(function(pos){
          return pos;
        });
      }
    }
  })
})
.controller('profileCtrl', ['$scope', 'position', 'googleService', function($scope, position, googleService){

}])

