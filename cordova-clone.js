
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
	 * Object for holding various interval timers
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

	this.notice = function(message, timeout) {
		var timeout = typeof timeout !== 'undefined' ? timeout : 3000;

		var notifierContainer = document.getElementById('cordova-clone-notifier-container');
		if(!notifierContainer) {
			notifierContainer = document.createElement('div');
			notifierContainer.style.position = 'fixed';
			notifierContainer.style.right = '10px';
			notifierContainer.style.bottom = '10px';
			notifierContainer.style.display = 'block';
			notifierContainer.setAttribute('id', 'cordova-clone-notifier-container');
			document.body.appendChild(notifierContainer);
		}

		var notifier = document.createElement('div');
		notifier.style.borderRadius = "5px";
		notifier.style.backgroundColor = "#000000";
		notifier.style.color = '#ffffff';
		notifier.style.zIndex = 999;
		notifier.setAttribute('id', 'cordova-clone-notifier-' + message);
		notifier.style.padding = '10px';
		notifier.style.margin = '5px';
		notifier.style.boxShadow = "0px 0px 3px #000000";
		notifier.style.opacity = 0.8;
		var msg = document.createElement('p');
		msg.innerText = message;
		
		notifier.appendChild(msg);
		notifierContainer.appendChild(notifier);

		// Set a timeout
		setTimeout(function() {
			notifierContainer.removeChild(notifier);
		}, timeout);
		
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
 * A clone of the camera type to mimic the options available with the plugin
 * @type {Object}
 */
 var Camera = {};

/**
 * A clone of the destinationType to mimic the options available with the Camera Object
 * @type {Object}
 */
 Camera.destinationType = {
 	DATA_URL: 0,
 	DATA_URI: 1,
 	NATIVE_URI: 2, 
 };

/**
 * A clone of the PictureSourceType to mimic the options available with the Camera Object
 * @type {Object}
 */
 Camera.PictureSourceType = {
 	PHOTOLIBRARY:0,
 	CAMERA:1,
 	SAVEDPHOTOALBUM:2 
 }

/**
 * A clone of the EncodingType to mimc the options available with the camera object
 * @type {Object}
 */
 Camera.EncodingType = {
 	JEPG: 0,
 	PNG: 1
 }

/**
 * A clone of the MediaType to mimic the options available with the camera object
 * @type {Object}
 */
 Camera.MediaType = {
 	PICTURE: 0,
 	VIDEO:1,
 	ALLMEDIA:2
 };

/**
 * A clone of the Direction to mimic the options available with the camera object
 * @type  {Object}
 */
 Camera.Direction = {
 	BACK:0,
 	FRONT:1
 }

/**
 * Camera Plugin
 *
 * This clone allows for an image to be passed to the application to be used 
 * while in operation
 */
 navigator.camera = {

 	/**
 	 * This is a clone of the getPicture method of the Camera plugin
 	 * @param  {Function} cameraSuccess This is the callback function on success
 	 * @param  {Function} cameraError   This is the callback function on error
 	 * @param  {Object} options       This is a object holding the options of the camera
 	 * @return {void}               
 	 */
 	getPicture: function(cameraSuccess, cameraError, options) {
 		if(typeof(cameraSuccess) !== 'function') {
 			console.log('No cameraSuccess callback passed.');
 			return false;
 		} else {
 			var cameraSuccess = cameraSuccess;
 		}
 		if(typeof(cameraError) !== 'function') {
 			console.log('No cameraError callback passed.');
 			return false;
 		} else {
 			var cameraError = cameraError;
 		}
 		options = typeof options !== 'undefined' ? options : {
 			quality:75,
 			destinationType: Camera.destinationType.DATA_URL,
 			sourceType: Camera.PictureSourceType.CAMERA,
 			allowEdit: true,
 			encodingType: Camera.EncodingType.JPEG,
 			targetWidth: 100,
 			targetHeight: 100,
 			saveToPhotoAlbum: false
		}

		// Create a drop zone to drop images
		var dropZone = document.createElement('div');
		var dropText = document.createElement('p');
		dropZone.style.position = 'fixed';
		dropZone.style.width = '100px';
		dropZone.style.height = '100px';
		dropZone.style.backgroundColor = '#fff';
		dropZone.style.borderRadius = '5px';
		dropZone.style.boxShadow = '0px 0px 3px #000';
		dropZone.style.right = '10px';
		dropZone.style.bottom = '10px';
		dropZone.style.display = 'block';
		dropZone.style.textAlign = 'center';

		dropText.style.color = '#cccccc';
		dropText.style.fontFamily = 'Arial';
		dropText.innerText = 'Drop Image Here';
		dropZone.appendChild(dropText);

		document.body.appendChild(dropZone);

		function handleDrop(event) {
			event.preventDefault();
			// Get the encoded base64 data of the image droped. 
			var file = event.dataTransfer.items[0].getAsFile();
			// Just double check that it is a image first
			if(file.type !== 'image/png' && file.type !== 'image/jpg' && file.type !== 'image/jpeg') {
				alert('The file which was dropped is not a image. Please use a image to mimic the camera');
				return false;
			}

			// dataTransfer items filereader dataurl so on so forth
			var reader = new FileReader();
			// Listen for the progress event
			reader.onload = function(event) {
				cameraSuccess(event.target.result);
				// Remove the drop handler
				document.body.removeChild(dropZone);
			}
			// Listen for the reader error.
			reader.onerror = cameraError;

			reader.readAsDataURL(file);
			return false;
		}

		function highlightDrop(event) {
			event.currentTarget.style.backgroundColor = '#FF9699';
		}

		function leaveDrop(event) {
			event.currentTarget.style.backgroundColor = '#fff';
		}

		dropZone.addEventListener('drop', handleDrop);
		dropZone.addEventListener('dragover', highlightDrop);
		dropZone.addEventListener('dragleave', leaveDrop);
 	}
 }

 // Have to kill the default of dropping data files on the document
 window.addEventListener('dragover', function(e) {
 	e = e || event;
 	e.preventDefault();
 }, false);
window.addEventListener('drag', function(e) {
	e = e || event;
	e.preventDefault();
}, false);


/**
 * Connection object
 */
navigator.connection = {
	UNKNOWN: "unknown",
	ETHERNET: "ethernet",
	WIFI: "wifi",
	CELL_2G: "2g",
	CELL_3G: "3g",
	CELL_4G: "4g",
	CELL: "cellular",
	NONE: "none",
	type: ""
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
 * This holds the notification plugin
 */
navigator.notification = {

	alert: function(message, alertCallBack, title, buttonName) {
		alert(message);
		// Browser doesn't provide call back so mock it.
		if(typeof alertCallBack === 'function') {
			alertCallBack();
		}
	},

	confirm: function(message, confirmCallBack, title, buttonLabels) {
		confirm(message);
		if(typeof confirmCallBack === 'function') {
			confirmCallBack();
		}
	},

	prompt: function(message, promptCallBack, title, buttonLabels, defaultText) {
		var defaultText = typeof defaultText !== 'undefined' ? defaultText : '';

		var result = prompt(message, defaultText);
		var resultObject = {input1: result, buttonIndex: 1};
		if(typeof promptCallBack === 'function') {
			promptCallBack(resultObject);
		}
	},

	beep: function(times) {
		var repeats = typeof times !== 'undefined' ? times : 1;
		if(times > 1) {
			cordovaClone.notice(times + ' Beeps');
		} else {
			cordovaClone.notice('Beep');
		}
	},

	vibrate: function(timeout) {
		var timeout = typeof timeout !== 'undefined' ? timeout : 1000;
		cordovaClone.notice('Vibrating', timeout);
	}

};
/**
 * The app splash screen module
 */
navigator.splashscreen = {
	show: function() {
		// As we can't have an actual splash screen let's just put
		// up a notice
		console.log("Showing splashscreen");
		cordovaClone.notice("Splashscreen", 3000);
		return;
	},

	hide: function() {
		// As we can't have an actual splash screen let's just put
		// in a console log
		console.log("Hiding Splashscreen");
		return;
	}
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
