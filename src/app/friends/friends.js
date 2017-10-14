angular.module('homiefinder.friends', ['ui.router', 'homiefinder.googleService'])
.config(function($stateProvider){
  $stateProvider
  .state('homiefinder.friends', {
  	name: 'friends',
    url: '/friends',
    templateUrl: 'app/friends/friends.tpl.html',
    controller: 'friendsCtrl',
    resolve: {
      friends: function() {
        return googleService.getLocation().then(function(pos){
          return pos;
        });
      }
    }
  })
})
.controller('friendsCtrl', ['$scope', function($scope){

}])

