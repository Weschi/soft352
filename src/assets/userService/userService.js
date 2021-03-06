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

	var friendsKey = 'friends';
	var friendsStore = $localForage.createInstance({
		name: "friendsStore",
		storeName: "friendsStore"
	});

	var notificationKey = 'notifications';
	var notificationStore = $localForage.createInstance({
		name: "notificationStore",
		storeName: "notificationStore"
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

	this.getFriends = function(params) {
		if(!!navigator.onLine)
		{
			return ajaxResource.get(settings.friends.get, params).then(function(friends){
				friendsStore.setItem(friendsKey, friends);
				return friends;
			});
		}
		else
		{
			return friendsStore.getItem(friendsKey).then(function(friends) {
				return friends;
			});
		}
	};

	this.removeFriend = function(params) {
		return ajaxResource.remove(settings.friends.delete, params).then(function(friends){
			return friends;
		});
	};
	
	//friend request related
	this.createRequest = function(params) {
		return ajaxResource.post(settings.notificationRoute.create, params).then(function(data){
			return data;
		});
	};

	this.acceptRequest = function(params) {
		return ajaxResource.put(settings.notificationRoute.accept, params).then(function(data){
			return data;
		});		
	};

	this.declineRequest = function(params) {
		return ajaxResource.put(settings.notificationRoute.decline, params).then(function(data){
			return data;
		});		
	};

	this.getFriendRequests = function(params) {
		return ajaxResource.get(settings.notificationRoute.get, params).then(function(data){
			return data;
		});		
	};

	this.queryUsers = function(params, qsParams) {
		return ajaxResource.get(settings.userRoute.query, params, qsParams).then(function(data){
			return data;
		});
	};

	//friend request related
	this.getUser = function() {
		var deferred = $q.defer();
		userStore.getItem(key).then(function(auth) {
			if(!!auth)
			{
				return deferred.resolve(auth.user);
			}
			else
			{
				return deferred.resolve(auth);	
			}
		  
		});
		return deferred.promise;
	};

	//gets notifications for a user given an id.
	this.getNotifications = function(params) {
		if(!!navigator.onLine)
		{
			return ajaxResource.get(settings.notificationRoute.get, params).then(function(data){
				notificationStore.setItem(notificationKey, data);
				return data
			});
		}
		else
		{
			return notificationStore.getItem(notificationKey).then(function(notifications) {
				return notifications;
			});
		}
	};

	//called after login or register to create a cookie under the "global" key value pair with dur of 7 days.
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

	//called after logout, gets rid of localforage data and clears the cookie
	this.logout = function() {
		$cookies.remove("globals");
		this.removeUser();
		$rootScope.token = false;
		$state.go('homiefinder.home');
	};

	return this;
}]);