angular.module('homiefinder.userService', ['homiefinder.settings', 'homiefinder.ajaxResource'])
.service('userService', ['settings', 'ajaxResource', function(settings, ajaxResource) {

	console.log(settings);

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

	return this;
}]);