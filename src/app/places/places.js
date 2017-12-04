angular.module('homiefinder.places', ['ui.router', 'homiefinder.googleService'])
.config(function($stateProvider){
  $stateProvider
  .state('homiefinder.places', {
  	name: 'places',
    url: '/places',
    templateUrl: 'app/places/places.tpl.html',
    controller: 'placesCtrl',
    resolve: {
      places: function(googleService) {
        return googleService.getPlaces() ? googleService.getPlaces() : googleService.initialisePlaces(google, map);
      }     
    }
  });
})
.controller('placesCtrl', ['$scope', 'googleService', 'places', function($scope, googleService, places){

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
    places : places
  };

  $scope.getDirections = function(venue) {
    //should pass a venue to home.js to display it ? or make this entire page part of home
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
    googleService.placesNearbySearch($scope.controls.position, query).then(function(places){
      $scope.controls.venues = places;
    });
  };


}]);

