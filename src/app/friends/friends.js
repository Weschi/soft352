angular.module('homiefinder.friends', ['ui.router', 'homiefinder.googleService', 'homiefinder.userService'])
.config(function($stateProvider){
  $stateProvider
  .state('homiefinder.friends', {
  	name: 'friends',
    url: '/friends',
    templateUrl: 'app/friends/friends.tpl.html',
    controller: 'friendsCtrl',
    resolve: {
      users: function(userService) {
        return userService.getUsers().then(function(users){
          return users.data;
        });
      }
    }
  })
})
.controller('friendsCtrl', ['$scope', 'userService', 'users', function($scope, userService, users){

$scope.controls = {
  users : users,
  usersCopy : users
};

$scope.query = function(query) {
    $scope.controls.users = _.map($scope.controls.usersCopy, function(user){
      return _.includes(user.name, query);
    });
};

$scope.$watch('controls.search', function(newVal, oldVal){
  if(newVal !== oldVal)
  {

  }
});

  $scope.$watch('controls.users', function(newVal, oldVal) {
    if(!!$scope.controls.users.length)
    {
        $('.collapsible').collapsible();
    }
  })


}]);

