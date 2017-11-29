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
      },
      nTab: function($stateParams) {
        return !!$stateParams.nTab ? $stateParams.nTab : 1;
      }
    }
  });
})
.controller('friendsCtrl', ['$scope', 'userService', 'user', 'friends', 'nTab', function($scope, userService, user, friends, nTab){

  $scope.controls = {
    friends: friends,
    nTab: nTab,
    user : user
  };

  //query friends
  $scope.query = function(query) {
      
      if($scope.controls.nTab == 2)
      {
        userService.queryUsers({userId : user._id, query : query}).then(function(users){
          $scope.controls.users = users;
        });
      }
      else if($scope.controls.nTab == 1)
      {
        //Local filter friends
        $scope.controls.friends = _.filter(angular.copy($scope.controls.friends), function(friend){
          return _.includes(friend.name, query) || _.includes(friend.email, query);
        });
      }
  };

  $scope.removeFriend = function(friend) {
    userService.removeFriend({userId : $scope.controls.user._id, friendId : friend._id}).then(function(response){
      $scope.controls.friends = response;
      Materialize.toast(friend.name + ' removed.', 2000);
    });
  };

  $scope.friendRequest = function(toId) {
    var params = { userId : $scope.controls.user._id, toId : toId};
    userService.createFriendRequest(params).then(function(response){
      Materialize.toast('Friend request sent', 2000);
    });
  };


}]);

