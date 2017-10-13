angular.module('homiefinder.friends', ['ui.router', 'homiefinder.positionService'])
.config(function($stateProvider){
  $stateProvider
  .state('homiefinder.friends', {
  	name: 'friends',
    url: '/friends',
    templateUrl: 'app/friends/friends.tpl.html',
    controller: 'friendsCtrl',
    resolve: {
      friends: function() {
        return positionService.getPosition().then(function(pos){
          return pos;
        });
      }
    }
  })
})
.controller('friendsCtrl', ['$scope', function($scope){

}])

