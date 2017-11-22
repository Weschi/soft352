angular.module('homiefinder.users', ['ui.router', 'homiefinder.userService'])
.config(function($stateProvider){
  $stateProvider
  .state('homiefinder.users', {
  	name: 'users',
    url: '/users',
    templateUrl: 'app/users/users.tpl.html',
    controller: 'usersCtrl',
    resolve: {
    }
  })
})
.controller('usersCtrl', ['$scope', 'userService', '$state', '$rootScope', function($scope, userService, $state, $rootScope){

  $scope.controls = {
    nTab : 1,
    user : {}
  }

  function resetUser() {
    $scope.controls.user = {};
  }

  function setTab(val) {
    $scope.controls.nTab = val;
  }

  $scope.tabLogin = function() {
    resetUser();
    setTab(1);
  };

  $scope.tabRegister = function() {
    resetUser();
    setTab(2);
  }

  $scope.register = function() {
    //factory
    var params = { email: $scope.controls.user.email, fullName: $scope.controls.user.fullName, password: $scope.controls.user.password, confirmPassword: $scope.controls.user.confirmPassword };
    userService.postRegister(params).then(function(response){
      userService.setUser(response.data).then(function(auth){
        userService.setCredentials(auth.user.email, auth.token);
        $rootScope.token = auth.token;
        $state.go('homiefinder.profile', {token : auth.token});
      });
    }, function(err) {
      //neh
    });
  };

  $scope.loginValidation = function() {
    return (!$scope.controls.user.email || !$scope.controls.user.password);
  };

  $scope.registerValidation = function() {
    return (!$scope.controls.user.email || !$scope.controls.user.password || !$scope.controls.user.confirmPassword || !$scope.controls.user.fullName ||
      $scope.controls.user.password !== $scope.controls.user.confirmPassword && $scope.controls.password.length < 6);
  };

  $scope.login = function() {
    var params = { email: $scope.controls.user.email, password: $scope.controls.user.password};
    userService.postLogin(params).then(function(response){
      userService.setUser(response.data).then(function(auth){
        userService.setCredentials(auth.user.email, auth.token);
        $rootScope.token = auth.token;
        $state.go('homiefinder.profile', {token : auth.token});
      });
    }, function(err) {
      $scope.error = 'Invalid email or password.';
    });
  };

}])

