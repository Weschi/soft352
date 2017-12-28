angular.module('homiefinder.profile', ['ui.router', 'homiefinder.googleService', 'homiefinder.userService'])
.config(function($stateProvider){
  $stateProvider
  .state('homiefinder.profile', {
  	name: 'profile',
    url: '/profile',
    templateUrl: 'app/profile/profile.tpl.html',
    controller: 'profileCtrl',
    resolve: {
      user: function(userService) {
        return userService.getUser().then(function(user){
          return user;
        });
      }
    }
  });
})
.controller('profileCtrl', ['$scope', 'user', function($scope, user){

  $scope.controls = {
    user: user
  };
  
}]);


