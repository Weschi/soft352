angular.module('homiefinder.home', ['ui.router', 'homiefinder.positionService'])
.config(function($stateProvider){
  $stateProvider
  .state('homiefinder.home', {
  	name: 'home',
    url: '/home',
    templateUrl: 'app/home/home.tpl.html',
    controller: 'homeCtrl',
    resolve: {
      position: function(positionService) {
        return positionService.getPosition().then(function(pos){
          return pos;
        });
      }
    }
  })
  .state('homiefinder.init', {
    url: '',
    templateUrl: 'app/home/home.tpl.html',
    controller: 'homeCtrl',
    resolve: {
      position: function(positionService) {
        return null;
      }
    }
  })
})
.controller('homeCtrl', ['$scope', 'position', 'positionService', function($scope, position, positionService){

  function initMap(position) {
  //{lat: -25.363, lng: 131.044};
    var uluru = position;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: uluru
    });
    $scope.marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
  }

  if(!!navigator.geolocation)
  {   
    navigator.geolocation.getCurrentPosition(function(position)
    {
      initMap({lat : position.coords.latitude, lng : position.coords.longitude });
    });
  }


}])

