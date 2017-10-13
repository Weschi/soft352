angular.module('homiefinder.register', ['ui.router'])
.config(function($stateProvider){
  $stateProvider
  .state('homiefinder.register', {
  	name: 'register',
    url: '/register',
    templateUrl: 'app/register/register.tpl.html',
    controller: 'registerCtrl',
    resolve: {
      position: function(positionService) {
        return positionService.getPosition().then(function(pos){
          return pos;
        });
      }
    }
  })
})
.controller('registerCtrl', ['$scope', function($scope){

}])

