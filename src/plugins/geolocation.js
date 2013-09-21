/**
 * navigator.geolocation
 */
navigator.geolocation.__proto__ = {

	getCurrentPosition: function(geolocationSuccess, geolocationError, geolocationOptions) {
		var successReference = geolocationSuccess;
		var errorReference = geolocationError;

		function errorCallback() {
			var errorObject = new PositionError();
			errorReference(errorObject);
		}

		function successCallback() {
			var posObject = new Position();
			successReference(posObject);
		}

		if(geolocationError) {
			if(cordovaClone.jsonObject.geolocation.fail) {
				if(cordovaClone.jsonObject.geolocation.delay) {
					cordovaClone.setDelay(errorCallback, cordovaClone.jsonObject.geolocation.delay);
					return;
				} else {
					geolocationError();
					return;
				}
			}
		}

		if(cordovaClone.jsonObject.geolocation.delay) {
			cordovaClone.setDelay(successCallback, cordovaClone.jsonObject.geolocation.delay);
			return;
		} else {
			successCallback();
			return;
		}
	},

	watchPosition: function(geolocationSuccess, geolocationError, geolocationOptions) {
		var successReference = geolocationSuccess;
		var errorReference = geolocationError;
		

		function errorCallback() {
			var errorObject = new PositionError();
			errorReference(errorObject);
		}

		function successCallback() {
			var posObject = new Position();
			posObject.coords.altitude += Math.random();
			posObject.coords.longitude += Math.random();
			successReference(posObject);
		}

		if(geolocationError) {
			if(cordovaClone.jsonObject.geolocation.fail) {
				if(cordovaClone.jsonObject.geolocation.delay) {
					cordovaClone.setDelay(errorCallback, cordovaClone.jsonObject.geolocation.delay);
					return;
				} else {
					geolocationError();
					return;
				}
			}
		}

		if(cordovaClone.jsonObject.geolocation.delay) {
			cordovaClone.setInterval(successCallback, 'geoWatch', cordovaClone.jsonObject.geolocation.delay);
			return;
		} else {
			successCallback();
			return;
		}
	},

	clearWatch: function(){
		cordovaClone.removeInterval('geoWatch');
		return;
	}
};

/**
 * Simplistic Position object
 */
var Position = function() {
	this.coords = cordovaClone.jsonObject.geolocation.coords;
	this.timestamp = cordovaClone.jsonObject.geolocation.timestamp;
};

/**
 * Simplistic Position Error object
 */
var PositionError = function() {
	this.PERMISSION_DENIED = 0;
	this.POSITION_UNAVAILABLE = 1;
	this.POSITION_TIMEOUT = 2;
	this.code = cordovaClone.jsonObject.geolocation.positionerror.errorcode;
	this.message = null;
};

