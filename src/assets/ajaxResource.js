angular.module('homiefinder.ajaxResource', [])
.service('ajaxResource', function($http, $q, $interpolate) {
//$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

	var config = {
		headers : {
			'Content-Type': 'application/json'
		}
	}

	this.post = function(uri, params)
	{
		var deferred = $q.defer();
		// Simple GET request example:
		uri = $interpolate(uri)(params);
		$http.post(uri, params, config).then(
		function(params){
			deferred.resolve(params);
		}, function(error){
			deferred.reject(error);
		});

		return deferred.promise;
	}

	this.get = function(uri, params)
	{
		var deferred = $q.defer();
		
		uri = $interpolate(uri)(params);

		$http.get(uri, params, config).then(function(params){
			deferred.resolve(params);
		}, function(error){
			deferred.reject(error);
		});

		return deferred.promise;
	}

	this.put = function(uri, params)
	{
		var deferred = $q.defer();

		$http.put($interpolate(uri)(params), params, config).then(function(params){
			deferred.resolve(params);
		}, function(error){
			deferred.reject(error);
		});

		return deferred.promise;
	}

	this.remove = function(uri, params)
	{
		var deferred = $q.defer();

		$http.delete(uri, params, config).then(function(params){
			deferred.resolve(params);
		}, function(error){
			deferred.reject(error);
		});

		return deferred.promise;
	}

	return this;
});