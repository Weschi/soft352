angular.module('homiefinder.friends', ['ui.router', 'homiefinder.googleService', 'homiefinder.userService'])
.config(function($stateProvider){
  $stateProvider
  .state('homiefinder.friends', {
  	name: 'friends',
    url: '/friends',
    templateUrl: 'app/friends/friends.tpl.html',
    controller: 'friendsCtrl',
    resolve: {
      user: function(userService) {
        return userService.getUser().then(function(user){
          return user;
        });
      },
      friends: function(userService, user) {
        return userService.getFriends({userId: user._id.toString()}).then(function(friends){
          return friends;
        });
      }
    }
  })
})
.controller('friendsCtrl', ['$scope', 'userService', 'user', 'friends', function($scope, userService, user, friends){

  $scope.controls = {
    friends: friends
  };

  $scope.query = function(query) {
      
      userService.queryUsers({userId : user._id, query : query}).then(function(users){
        $scope.controls.users = users;
      }); 
  };

  $scope.friendRequest = function(toId) {
    var params = { userId : $scope.controls.user._id, toId : toId};
    userService.createFriendRequest(params).then(function(response){

    });
  };


}]);

