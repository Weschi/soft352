angular.module('homiefinder.map', ['ui.router', 'homiefinder.googleService'])
.config(function($stateProvider){
  $stateProvider
  .state('homiefinder.map', {
  	name: 'map',
    url: '/map',
    templateUrl: 'app/map/map.tpl.html',
    controller: 'mapCtrl',
    resolve: {
      position: function(googleService) {
        return googleService.getLocation();
      },
      meetings: function(meetingService, user) {
        return meetingService.get({userId : user._id}).then(function(meetings){
          return meetings;
        });
      },
      friends: function(userService, user) { //remove this call, get from app.js
        return userService.getFriends({userId: user._id.toString()}).then(function(friends){
          return friends;
        });
      },
      requested: function($stateParams) {
      	return $stateParams;
      }
    }
  })
})
.controller('mapCtrl', ['$scope', 'position', 'googleService', 'friends', 'meetings', 'requested', function($scope, position, googleService, friends, meetings, requested){
  function initMap(position) {
  //{lat: -25.363, lng: 131.044};
    var uluru = position;
    $scope.controls.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: uluru
    });
    $scope.marker = new google.maps.Marker({
      position: uluru,
      map: $scope.controls.map
    });
    googleService.setMap($scope.controls.map);
    googleService.setGoogle(google);
  }

  //the aim of this is to create a marker for each friend the user has, as they should have a location
  function setFriendMarkers(friends) {

  };

  //the aim of this is to create a marker for each meeting the user has, as they should have a location
  function setMeetingMarkers(meetings) {

  };

  if(!!navigator.geolocation)
  {   
    navigator.geolocation.getCurrentPosition(function(position)
    {
      initMap({lat : position.coords.latitude, lng : position.coords.longitude });
    });
  }


}]);

