angular.module('homiefinder.map', ['ui.router', 'homiefinder.googleService', 'homiefinder.socket'])
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
      },
      user: function(userService) {
        return userService.getUser().then(function(user){
          return user;
        });
      },
      getDirections: function($stateParams) {
        return !!$stateParams.getDirections ? { lat: $stateParams.lat, lng: $stateParams.longitude} : null
      }
    }
  })
})
.controller('mapCtrl', ['$scope', 'position', 'googleService', 'friends', 'meetings', 'requested', 'socket', 'user', function($scope, position, googleService, friends, meetings, requested, socket, user){

  $scope.controls = {
    markers : []
  }

  var socket = io.connect();

  if(!!user._id)
  {
    //join my own room
    socket.emit('join', {id : user._id});
  }

  if(!!friends)
  {
    //join my friend's room
    _.each(friends, function(friend){
      //listen to friend rooms
      socket.emit('join', {id: friend._id});
    });
  }

  socket.on('coordChange', function(data){
      var marker = _.find($scope.controls.markers, {userId : data.userId});

      marker.setPosition({lat: data.coords.latitude, lng : data.coords.longitude});
    
  });

  function calculateAndDisplayRoute(directionsService, directionsDisplay, currentLocation, meetingLocation) {
    directionsService.route({
        origin: currentLocation,
        destination: meetingLocation,
        travelMode: 'DRIVING'
        }, function(response, status) {
        if (status === 'OK') 
        {
          directionsDisplay.setDirections(response);
        } 
        else 
        {
          window.alert('Directions request failed due to ' + status);
        }
    });
  }
  //https://developers.google.com/maps/documentation/javascript/examples/directions-simple
  function initMap(position) {
  //{lat: -25.363, lng: 131.044};
    var uluru = position;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: uluru
    });

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;

    //directionsDisplay.setMap(new google.maps.Map(document.getElementById('map')));

    var marker = new google.maps.Marker({
      position: uluru,
      map: map,
      userId : user._id,
      icon: 'app/images/user.png'
    });

    $scope.controls.markers.push(marker);

    var infowindow = new google.maps.InfoWindow({
      content: 'Me!'
    });

    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });

    googleService.setMap(map);
    googleService.setGoogle(google);
    _.each(friends, function(friend){
      if(!!friend.location)
      {
        var marker = new google.maps.Marker({
          userId: friend._id,
          position:{lat: friend.location.latitude, lng : friend.location.longitude},
          map: map,
          icon: 'app/images/friend.png'
        });
        $scope.controls.markers.push(marker);
    
        var infowindow = new google.maps.InfoWindow({
          content: friend.email
        });

        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
      }
    });

    _.each(meetings, function(meeting){
      if(!!meeting.place && meeting.status !== 4)
      {
        var marker = new google.maps.Marker({
          position:{lat: meeting.place.latitude, lng : meeting.place.longitude},
          map: map,
          icon: 'app/images/meeting.png'
        });

        //calculateAndDisplayRoute(directionsService, directionsDisplay, uluru, {lat: meeting.place.latitude, lng : meeting.place.longitude});
        $scope.controls.markers.push(marker);
    
        var infowindow = new google.maps.InfoWindow({
          content: "Name: " + meeting.name + ". Created By: " + meeting.user.email 
        });

        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
      }
    });
  }

  if(!!navigator.geolocation)
  {   
    navigator.geolocation.getCurrentPosition(function(position)
    {
      initMap({lat : position.coords.latitude, lng : position.coords.longitude });
    });
  }


}]);

