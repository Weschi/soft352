angular.module('homiefinder.ajaxResource', [])
.service('ajaxResource', function($http, $q) {
//$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
	this.post = function(uri, params)
	{
		var deferred = $q.defer();
		// Simple GET request example:

		var config = {
            headers : {
                'Content-Type': 'application/json'
            }
        }
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
		// Simple GET request example:

		var config = {
            headers : {
                'Content-Type': 'application/json'
            }
        }
		$http.get(uri, params, config).then(
		function(params){
			deferred.resolve(params);
		}, function(error){
			deferred.reject(error);
		});

		return deferred.promise;
	}

	this.put = function(uri, params)
	{
		var deferred = $q.defer();
		// Simple GET request example:

		var config = {
            headers : {
                'Content-Type': 'application/json'
            }
        }
		$http.put(uri, params, config).then(
		function(params){
			deferred.resolve(params);
		}, function(error){
			deferred.reject(error);
		});

		return deferred.promise;
	}

	this.remove = function(uri, params)
	{
		var deferred = $q.defer();
		// Simple GET request example:

		var config = {
            headers : {
                'Content-Type': 'application/json'
            }
        }
		$http.delete(uri, params, config).then(
		function(params){
			deferred.resolve(params);
		}, function(error){
			deferred.reject(error);
		});

		return deferred.promise;
	}

	return this;
});