angular.module('homiefinder.home', ['ui.router', 'homiefinder.googleService'])
.config(function($stateProvider){
  $stateProvider
  .state('homiefinder.home', {
  	name: 'home',
    url: '/home',
    templateUrl: 'app/home/home.tpl.html',
    controller: 'homeCtrl',
    resolve: {
      position: function(googleService) {
        return googleService.getLocation();
      }
    }
  })
  .state('homiefinder.init', {
    url: '',
    templateUrl: 'app/home/home.tpl.html',
    controller: 'homeCtrl',
    resolve: {
      position: function(googleService) {
        return googleService.getLocation();
      }
    }
  });
})
.controller('homeCtrl', ['$scope', 'position', 'googleService', function($scope, position, googleService){
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
    googleService.setMap(map);
    googleService.setGoogle(google);
  }

  if(!!navigator.geolocation)
  {   
    navigator.geolocation.getCurrentPosition(function(position)
    {
      initMap({lat : position.coords.latitude, lng : position.coords.longitude });
    });
  }


}]);

