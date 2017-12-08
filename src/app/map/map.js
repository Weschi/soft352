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
      user : function(userService) {
        return userService.getUser().then(function(user){
          return user;
        });
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
    //someone in my room has their location updated, could be mine, but if not, update the google shit
    //we have recieved coords from a buddy, so update their marker on our map mon'
      var marker = _.find($scope.controls.markers, {userId : data.userId});

      marker.setPosition({lat: data.coords.latitude, lng : data.coords.longitude});
    
  });

  function initMap(position) {
  //{lat: -25.363, lng: 131.044};
    var uluru = position;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: uluru
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map,
      userId : user._id
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
          map: map
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
      if(!!meeting.place)
      {
        var marker = new google.maps.Marker({
          position:{lat: meeting.place.latitude, lng : meeting.place.longitude},
          map: map
        });
        $scope.controls.markers.push(marker);
    
        var infowindow = new google.maps.InfoWindow({
          content: meeting.name
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

