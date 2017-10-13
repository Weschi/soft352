angular.module('homiefinder.profile', ['ui.router', 'homiefinder.positionService'])
.config(function($stateProvider){
  $stateProvider
  .state('homiefinder.profile', {
  	name: 'profile',
    url: '/profile',
    templateUrl: 'app/profile/profile.tpl.html',
    controller: 'profileCtrl',
    resolve: {
      position: function(positionService) {
        return positionService.getPosition().then(function(pos){
          return pos;
        });
      }
    }
  })
})
.controller('profileCtrl', ['$scope', 'position', 'positionService', function($scope, position, positionService){

}])

