var service = angular.module('homiefinder.googleService', ['homiefinder.settings', 'homiefinder.ajaxResource', 'LocalForageModule'])
.service('googleService', ['$q', 'settings', 'ajaxResource', '$rootScope', '$localForage', function($q, settings, ajaxResource, $rootScope, $localForage) {

	var options = {
	  enableHighAccuracy: true,
	  timeout: 5000,
	  maximumAge: 0
	};

	this.map = undefined;
	this.google = undefined;
	this.places = undefined;
	this.isOnline = $rootScope.online = navigator.onLine;

	var key = 'googlePlaces';

	var googlePlaces = $localForage.createInstance({
		name: "googlePlaces" 
	});

	function setPlaces(places) {
		return googlePlaces.setItem(key, places).then(function(places) {
			return places;
		});
	};

	function getPlaces() {
		return googlePlaces.getItem(key).then(function(places) {
		  return places;
		});
	};

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

	//map independent call
	this.getPlaces = function(location, query, type, radius) {
		if(!!navigator.onLine)
		{
			var defer = $q.defer();
			this.getLocation(true).then(function(location){
				var params = {
					location: location,
					radius: !!radius ? radius : 500,
					type: !!type ? type : null,
					name : !!query ? query : null
				}
				var service = new google.maps.places.PlacesService(document.createElement('gplaces'));
				service.nearbySearch(params, function(places, status){
					defer.resolve(places);
					setPlaces(places);
				});
			});
			return defer.promise;
		}
		else
		{
			return getPlaces();
		}
	}

	this.getMap = function() {
		return this.map;
	}

	this.getLocation = function(extractCoords) {
		var defer = $q.defer();

		//Check if the browser supports geolocation
		if(navigator.geolocation)
		{
			navigator.geolocation.getCurrentPosition(function(position)
			{
				if(!!extractCoords)
				{
					return defer.resolve({lat : position.coords.latitude, lng : position.coords.longitude });
				}
				else
				{
					return defer.resolve(position);
				}
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
		return this.places;
	}

	this.placesNearbySearch = function(location, query, type, radius) {
		var defer = $q.defer();
		this.places.nearbySearch({
          location: location,
          radius: !!radius ? radius : 500,
          type: !!type ? type : null,
          name : query ? query : null
        }, function(places, status){
        	if(status === google.maps.places.PlacesServiceStatus.OK)
        	{
        		defer.resolve(places);
        	}
        	else
        	{
        		defer.resolve(null);
        	}
        });
        return defer.promise;
	}
	return this;
}]);