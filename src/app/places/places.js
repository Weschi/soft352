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
      google: function(googleService) {
        return googleService.getGoogle();
      },
      map: function(googleService) {
        return googleService.getMap();
      },
      places: function(googleService) {
        return googleService.getPlaces() ? googleService.getPlaces() : googleService.initialisePlaces(google, map);
      },
      venues: function(googleService, position) {
        return googleService.placesNearbySearch(position).then(function(places){
          return places;
        });
      }      
    }
  })
})
.controller('placesCtrl', ['$scope', 'position', 'googleService', 'google', 'map', 'places', 'venues', function($scope, position, googleService, google, map, places, venues){

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
    position : position,
    places : places,
    venues : venues
  }

  $scope.getDirections = function(venue) {
    //should pass a venue to home.js to display it ? or make this entire page part of home
  }

  $scope.$watch('controls.venues', function(newVal, oldVal) {
    if(!!$scope.controls.venues.length)
    {
        $('.collapsible').collapsible();
    }
  })

  $scope.initArr = function(rating) {
    var arr = [];
    for(var i = 0; i < rating; i++) {
      arr.push(i);
    }
    return arr;
  }

  googleService.setPlaces($scope.controls.places);

  $scope.nearbySearch = function(query) {
    googleService.placesNearbySearch($scope.controls.position, query).then(function(places){
      $scope.controls.venues = places;
    });
  }


}])

