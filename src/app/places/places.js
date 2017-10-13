angular.module('homiefinder.places', ['ui.router', 'homiefinder.positionService'])
.config(function($stateProvider){
  $stateProvider
  .state('homiefinder.places', {
  	name: 'places',
    url: '/places',
    templateUrl: 'app/places/places.tpl.html',
    controller: 'placesCtrl',
    resolve: {
      position: function(positionService) {
        return positionService.getPosition().then(function(pos){
          return pos;
        });
      }
    }
  })
})
.controller('placesCtrl', ['$scope', 'position', 'positionService', function($scope, position, positionService){

}])

