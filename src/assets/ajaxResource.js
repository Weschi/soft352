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

		$http.post($interpolate(uri)(params), params, config).then(
		function(response){
			deferred.resolve(response.data);
		}, function(error){
			deferred.reject(error);
		});

		return deferred.promise;
	}

	this.get = function(uri, params, qSParams)
	{
		var deferred = $q.defer();
		
		var getConfig = {
			headers : {
				'Content-Type': 'application/json'
			},
			params : !!qSParams ? qSParams : undefined
		}

		$http.get($interpolate(uri)(params), getConfig).then(function(response){
			deferred.resolve(response.data);
		}, function(error){
			deferred.reject(error);
		});

		return deferred.promise;
	}

	this.put = function(uri, params)
	{
		var deferred = $q.defer();

		$http.put($interpolate(uri)(params), params, config).then(function(response){
			deferred.resolve(response.data);
		}, function(error){
			deferred.reject(error);
		});

		return deferred.promise;
	}

	this.remove = function(uri, params)
	{
		var deferred = $q.defer();

		$http.delete($interpolate(uri)(params), params, config).then(function(response){
			deferred.resolve(response.data);
		}, function(error){
			deferred.reject(error);
		});

		return deferred.promise;
	}

	return this;
});