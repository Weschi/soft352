angular.module('homiefinder.places', ['ui.router', 'homiefinder.googleService'])
.config(function($stateProvider){
  $stateProvider
  .state('homiefinder.places', {
  	name: 'places',
    url: '/places',
    templateUrl: 'app/places/places.tpl.html',
    controller: 'placesCtrl',
    resolve: {
      position: function(googleService) {
        return googleService.getLocation(true);
      },
      places: function(googleService) {
        return googleService.getPlaces() ? googleService.getPlaces() : googleService.initialisePlaces(google, map);
      }     
    }
  });
})
.controller('placesCtrl', ['$scope', '$state', 'googleService', 'places', 'position', function($scope, $state, googleService, places, position){

  var placeTypes = [
    'default',
    'accounting',
    'airport',
    'amusement_park',
    'aquarium',
    'art_gallery',
    'atm',
    'bakery',
    'bank',
    'bar',
    'beauty_salon',
    'bicycle_store',
    'book_store',
    'bowling_alley',
    'bus_station',
    'cafe',
    'campground',
    'car_dealer',
    'car_rental',
    'car_repair',
    'car_wash',
    'casino',
    'cemetery',
    'church'
  ];
  //note - check out venues call
  $scope.controls = {
    placeTypes : placeTypes,
    places : places,
    placesCopy: angular.copy(places),
    position : position
  };

  $scope.getDirections = function(place) {
    var params = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
      getDirections : true
    }

    $state.go('homiefinder.map', params);
  };

  $scope.arrangeMeeting = function(place) {
    var params = {
      placeId : place.place_id
    }

    $state.go('homiefinder.meetings', params);
  };

  $scope.initArr = function(rating) {
    var arr = [];
    for(var i = 0; i < rating; i++) {
      arr.push(i);
    }
    return arr;
  };

  googleService.setPlaces($scope.controls.places);

  $scope.nearbySearch = function(query) {
    if(!!navigator.onLine)
    {      
      googleService.placesNearbySearch($scope.controls.position, query).then(function(places){
        $scope.controls.places = places;
      });
    }
    else
    {
      $scope.controls.places = _.filter(angular.copy($scope.controls.placesCopy), function(place){
        return _.includes(place.name.toLowerCase(), query.toLowerCase());
      });
    }
  };


}]);

