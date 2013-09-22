
/**
* Copyright 2013 VCROWD(R) Pty. Ltd.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
            
/**
 * Provide basic untilities
 */
CordovaClone = function() {
	
	/**
	 * Holds the json object of the config.json
	 * @type {string}
	 */
	this.jsonObject = null;

	/**
	 * Fix for lexical scope during event handlers
	 */
	var that = this;

	/**
	 * Array for holding various interval timers
	 * @type {Object}
	 */
	var timers = {};

	/**
	 * Read contents of the config into the json object
	 * @return {void}
	 */
	this.readConfig = function() {
		var req = new XMLHttpRequest();
		req.onload = parseContents;
		req.open('get', 'http://localhost:9999/config/config.json');
		req.send();
	};

	/**
	 * Closure: Capture response and turn into json object
	 * @return {void} 
	 */
	function parseContents() {
		that.jsonObject = JSON.parse(this.response);
		var deviceEvent = new Event('config_updated');
		document.dispatchEvent(deviceEvent);
	}

	/**
	 * Repair the config file if it is damaged
	 * @return {boolean} Succsessful?
	 */
	this.repairConfig = function() {
		//TODO: If the JSON object get's damaged or lost
		// Build a new one
	};

	/**
	 * Sets a delay for an event
	 * @param {pointer} reference A reference to a javascript function
	 * @param {integer} delay A integer representing milliseconds
	 * @return {void}
	 */
	this.setDelay = function(reference, delay) {
		// Don't do anything fancy just use the setTimeout()
		// function
		setTimeout(reference, delay);
		return;
	};

	/**
	 * Add a interval object to the timers object
	 * @param {pointer} reference A reference to a javascript function
	 * @param {string} name  A string ID for the interval
	 * @param {integer} delay A dealy integer representing milliseconds
	 */
	this.setInterval = function(reference, name, delay) {
		// Store the interval into the tiemrs list identifiable by name
		var tempTimer = setInterval(reference, delay);
		timers[name] = tempTimer;
		return;
	};

	/**
	 * Removes a interval object from the timers object
	 * @param  {string} name A string ID for the interval
	 * @return {void}      
	 */
	this.removeInterval = function(name) {
		clearTimeout(timers[name]);
		return;
	};



	// Let's make this a singleton
	if(CordovaClone.prototype.singleton) {
		return CordovaClone.prototype.singleton;
	}

	this.readConfig();

	this.setInterval(function() {
		that.jsonObject = that.readConfig();
	}, 'updater', 5000);

	CordovaClone.prototype.singleton = this;
	return this;
};
/**
 *  Holds the device object
 */
document.addEventListener("config_updated", function() {
	window.device = cordovaClone.jsonObject.device;
})
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


/**
 * Bootstrapper
 */
(function() {
	console.log('Brewing the coffee...');

	var deviceEvent = new Event('deviceready');
	document.addEventListener('deviceready', main);
	document.dispatchEvent(deviceEvent);

	// Create the clone
	window.cordovaClone = new CordovaClone();

})();
