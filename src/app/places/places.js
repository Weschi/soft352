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
        return googleService.getLocation();
      },
      google: function(googleService) {
        return googleService.getGoogle();
      },
      map: function(googleService) {
        return googleService.getMap();
      },
      places: function(googleService) {
        return googleService.getPlaces();
      }
    }
  })
})
.controller('placesCtrl', ['$scope', 'position', 'googleService', 'google', 'map', 'places', function($scope, position, googleService, google, map, places){

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

  $scope.controls = {
    placeTypes : placeTypes,
    google : google,
    map : map,
    places : !!places ? places : googleService.initialisePlaces(google, map)
  }

  googleService.setPlaces($scope.controls.places);

  $scope.nearbySearch = function(query) {
    $scope.controls.venues = googleService.placesNearbySearch(query);

  }


}])

