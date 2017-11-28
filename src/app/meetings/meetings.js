angular.module('homiefinder.meetings', ['ui.router', 'homiefinder.googleService', 'homiefinder.userService'])
.config(function($stateProvider){
  $stateProvider
  .state('homiefinder.meetings', {
  	name: 'meetings',
    url: '/meetings',
    templateUrl: 'app/meetings/meetings.tpl.html',
    controller: 'meetingsCtrl',
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
  })
})
.controller('meetingsCtrl', ['$scope', 'userService', 'user', 'friends', 'nTab', function($scope, userService, user, friends, nTab){

  $scope.controls = {
    friends: friends,
    nTab: nTab,
    user : user
  };
  //date input utils
	var currentTime = new Date();
	$scope.currentTime = currentTime;
	$scope.month = ['Januar', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	$scope.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	$scope.weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	$scope.weekdaysLetter = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
	$scope.disable = [false, 1, 7];
	$scope.today = 'Today';
	$scope.clear = 'Clear';
	$scope.close = 'Close';
	var days = 15;
	$scope.minDate = (new Date($scope.currentTime.getTime() - ( 1000 * 60 * 60 * 365 * days ))).toISOString();
	$scope.maxDate = (new Date($scope.currentTime.getTime() + ( 1000 * 60 * 60 * 365* days ))).toISOString();
	
	$scope.onStart = function () {
		console.log('onStart');
	};
	$scope.onRender = function () {
		console.log('onRender');
	};
	$scope.onOpen = function () {
		console.log('onOpen');
	};
	$scope.onClose = function () {
		console.log('onClose');
	};
	$scope.onSet = function () {
		console.log('onSet');
	};
	$scope.onStop = function () {
		console.log('onStop');
	};


  //query friends
  $scope.query = function(query) {
      
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

