angular.module('homiefinder.userService', ['homiefinder.settings', 'homiefinder.ajaxResource', 'LocalForageModule', 'ngCookies'])
.service('userService', ['settings', 'ajaxResource', '$localForage', '$q', '$cookies', '$rootScope', '$http', '$state', function(settings, ajaxResource, $localForage, $q, $cookies, $rootScope, $http, $state) {

	this.postLogin = function(params) {
		return ajaxResource.post(settings.userRoute.login, params).then(function(data){
			return data;
		});
	}

	this.postRegister = function(params) {
		return ajaxResource.post(settings.userRoute.register, params).then(function(data){
			return data;
		});
	}

	var key = 'user';
	var userStore = $localForage.createInstance({
		name: "userStore",
		storeName: "userStore"
	});

	this.removeUser = function() {
		return userStore.removeItem(key);
	};


	this.getUsers = function() {
		return ajaxResource.get(settings.userRoute.users).then(function(users){
			return users;
		});
	};

	//Need a wrapper to be stored, so we can store multiple musters locally, under one value.
	this.setUser = function(user) {
		return userStore.setItem(key, user).then(function(user) {
			return user;
		});
	};

	this.getUser = function() {
		var deferred = $q.defer();
		userStore.getItem(key).then(function(user) {
		  return deferred.resolve(user);
		});
		return deferred.promise;
	};

	this.setCredentials = function(email, token) {
 
        $rootScope.globals = {
            currentUser: {
                username: email,
                authdata: token
            }
        };

        // set default auth header for http requests
        $http.defaults.headers.common['Authorization'] = 'Basic ' + token;

        // store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
        var cookieExp = new Date();
        cookieExp.setDate(cookieExp.getDate() + 7);
        $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
	};

	this.logout = function() {
		$cookies.remove("globals");
		this.removeUser();
		$rootScope.token = false;
		$state.go('homiefinder.home');
	};

	return this;
}]);