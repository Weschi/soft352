angular.module('homiefinder.profile', ['ui.router', 'homiefinder.googleService', 'homiefinder.userService'])
.config(function($stateProvider){
  $stateProvider
  .state('homiefinder.profile', {
  	name: 'profile',
    url: '/profile',
    templateUrl: 'app/profile/profile.tpl.html',
    controller: 'profileCtrl',
    resolve: {
      position: function(googleService) {
        return googleService.getLocation(true);
      },
      user: function(userService) {
        return userService.getUser().then(function(user){
          return user;
        });
      }
      /*friends: function(userService) {
        userService.getFriends().then(function(friends){
          return friends;
        });
      }*/
    }
  });
})
.controller('profileCtrl', ['$scope', 'position', 'googleService', 'userService', 'user', function($scope, position, googleService, userService, user){

  $scope.controls = {
    position: position,
    user: user
  };

  function initMap(position) {
    var uluru = position;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: uluru
    });
    $scope.marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
    googleService.setMap(map);
    googleService.setGoogle(google);
  }

  initMap(position);

}]);


