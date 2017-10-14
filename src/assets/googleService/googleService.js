var service = angular.module('homiefinder.googleService', ['homiefinder.settings', 'homiefinder.ajaxResource'])
.service('googleService', ['$q', 'settings', 'ajaxResource', function($q, settings, ajaxResource) {

	var options = {
	  enableHighAccuracy: true,
	  timeout: 5000,
	  maximumAge: 0
	};

	this.map = undefined;
	this.google = undefined;
	this.places = undefined;

	this.setGoogle = function(google) {
		this.google = google;
	}

	this.setMap = function(map) {
		this.map = map;
	}

	this.setPlaces = function(places) {
		this.places = places;
	}

	this.getGoogle = function() {
		return this.google;
	}

	this.getPlaces = function() {
		return this.places;
	}

	this.getMap = function() {
		return this.map;
	}

	this.getLocation = function() {
		var defer = $q.defer();

		//Check if the browser supports geolocation
		if(navigator.geolocation)
		{
			navigator.geolocation.getCurrentPosition(function(position)
			{
				return defer.resolve(position);
			}, function(){}, options);
		}
		return defer.promise;
	}

	this.addMapMarker = function() {

	}

	this.removeMapMarker = function() {

	}

	this.updateMapMarker = function() {

	}

	this.setMapMarkers = function() {

	}

	this.initialisePlaces = function(google, map) {
		if(!this.google || !this.map)
		{
			this.places = new this.google.maps.places.PlacesService(this.map);
		}
		else
		{
			this.places = new google.maps.places.PlacesService(map);
		}
	}

	this.placesNearbySearch = function(location, type, radius) {
		this.places.nearbySearch({
          location: location,
          radius: !!radius ? radius : 500,
          type: !!type ? type : null
        }, function(places, status){
        	return !!status === places.PlacesServiceStatus.Ok && places;
        });
	}

	return this;
}]);