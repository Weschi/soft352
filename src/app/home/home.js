angular.module('homiefinder.home', ['ui.router', 'positionService'])
.config(function($stateProvider){
  $stateProvider
  .state('homiefinder.home', {
  	name: 'home',
    url: '/home',
    templateUrl: 'app/home/home.tpl.html',
    controller: 'homeCtrl',
    resolve: {
      position: function(positionService) {

      }
    }
  })
  .state('homiefinder.init', {
    url: '',
    templateUrl: 'app/home/home.tpl.html',
    controller: 'homeCtrl',
    resolve: {
      position: function(positionService) {

      }
    }
  })
})
.controller('homeCtrl', ['$scope', 'position', 'positionService', function($scope, position, positionService){

function initMap(position) {
  //{lat: -25.363, lng: 131.044};
        var uluru = position;
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
      }

positionService.getPosition();

initMap(position);

}])

