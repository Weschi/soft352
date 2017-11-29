angular.module('homiefinder.meetingService', ['homiefinder.settings', 'homiefinder.ajaxResource', 'LocalForageModule', 'ngCookies'])
.service('meetingService', ['settings', 'ajaxResource', '$localForage', '$q', '$cookies', '$rootScope', '$http', '$state', function(settings, ajaxResource, $localForage, $q, $cookies, $rootScope, $http, $state) {

	var key = 'meetings';
	var meetingStore = $localForage.createInstance({
		name: "meetingStore",
		storeName: "meetingStore"
	});

	this.post = function(params) {
		return ajaxResource.post(settings.meetingRoute.post, params).then(function(data){
			return data;
		});
	}

	this.put = function(params) {
		return ajaxResource.put(settings.meetingRoute.put, params).then(function(data){
			return data;
		});
	}

	this.delete = function(params) {
		return ajaxResource.delete(settings.meetingRoute.delete, params).then(function(data){
			return data;
		});
	}

	this.get = function(params) {
		return ajaxResource.get(settings.meetingRoute.get, params).then(function(data){
			return data;
		});
	}

	return this;
}]);