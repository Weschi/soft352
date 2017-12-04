angular.module('homiefinder.meetings', ['ui.router', 'homiefinder.googleService', 'homiefinder.userService', 'homiefinder.meetingService'])
.config(function($stateProvider){
  $stateProvider
  .state('homiefinder.meetings', {
  	name: 'meetings',
    url: '/meetings',
    templateUrl: 'app/meetings/meetings.tpl.html',
    controller: 'meetingsCtrl',
    resolve: {
      places: function(googleService) {
        return googleService.getPlaces() ? googleService.getPlaces() : googleService.initialisePlaces(google, map);
      },
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
      },
      meetings: function(meetingService, user) {
        return meetingService.get({userId : user._id}).then(function(meetings){
          return meetings;
        });
      }
    }
  });
})
.controller('meetingsCtrl', ['$scope', 'userService', 'meetingService', 'user', 'friends', 'nTab', 'meetings', 'places', function($scope, userService, meetingService, user, friends, nTab, meetings, places){

  $scope.controls = {
    friends: friends,
    nTab: nTab,
    user : user,
    places : places,
    meetings : meetings
  };
  //date input utils
	var currentTime = new Date();
	$scope.currentTime = currentTime;
	$scope.month = ['Januar', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	$scope.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	$scope.weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	$scope.weekdaysLetter = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
	$scope.today = 'Today';
	$scope.clear = 'Clear';
	$scope.close = 'Close';
	var days = 15;
	$scope.minDate = (new Date()).toISOString();
	$scope.maxDate = (new Date($scope.currentTime.getTime() + ( 1000 * 60 * 60 * 365* days ))).toISOString();
	
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

  $scope.selectPlace = function(place) {
    $scope.controls.new = place;
  };
  $scope.createMeeting = function() {
    var format = 'DD-MM-YYYYTHH:mm';
    var meeting = angular.copy($scope.controls.new);
    meeting.userId = $scope.controls.user._id;
    meeting.date = moment(meeting.date + ' ' + meeting.time, format).format(format);
    //TODO: refactor plz
    var place = JSON.parse(meeting.place);
    meeting.place = {
      id : place.place_id,
      name : place.name,
      latitude : place.geometry.location.lat,
      longitude : place.geometry.location.lng
    };
    meetingService.post(meeting).then(function(response){
      Materialize.toast('Meeting ' + meeting.name + ' scheduled at ' + moment(response.date).format("MMMM Do YYYY HH:mm"), 4000);
      //$state.reload({nTab : 1});
    });
  };

}]);

