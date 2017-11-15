angular.module('homiefinder.ajaxResource', [])
.service('ajaxResource', function($http, $q) {
//$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
	this.post = function(uri, data)
	{
		var deferred = $q.defer();
		// Simple GET request example:

		var config = {
            headers : {
                'Content-Type': 'application/json'
            }
        }
		$http.post(uri, data, config).then(function(data){
			deferred.resolve(data);
		});
		/*$http({
		  method: 'POST',
		  url: uri,
		  data : $.param({test : "test"}),
		  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		  //headers : {'Content-Type': 'application/x-www-form-urlencoded'},
		}).then(function successCallback(response) {
		    deferred.resolve(response);
		  }, function errorCallback(response) {
		    deferred.reject(response);
		  });*/
		return deferred.promise;
	}

	this.get = function(uri, params)
	{
		// Simple GET request example:
		$http({
		  method: 'GET',
		  url: uri,
		  data : params
		}).then(function successCallback(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
	}

	this.put = function(uri, params)
	{
		// Simple GET request example:
		$http({
		  method: 'PUT',
		  url: uri,
		  data : params
		}).then(function successCallback(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
	}

	this.remove = function(uri, params)
	{
		// Simple GET request example:
		$http({
		  method: 'DELETE',
		  url: uri,
		  data : params
		}).then(function successCallback(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
	}

	return this;
});