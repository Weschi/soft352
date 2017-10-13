angular.module('homiefinder.positionService', ['homiefinder.settings', 'homiefinder.ajaxResource'])
.service('positionService', ['settings', 'ajaxResource', function($q, settings, ajaxResource) {

	var options = {
	  enableHighAccuracy: true,
	  timeout: 5000,
	  maximumAge: 0
	};

	function success(position) {
		return position;
	}

	function error(error) {
		console.log(error);
	}

	this.getPosition = function() {
		//Chec if the browser supports geolocation
		if(navigator.geolocation)
		{
			return navigator.geolocation.getCurrentPosition(function(position)
			{
				return position;
			}, error, options);
		}
	}

	return this;
}]);