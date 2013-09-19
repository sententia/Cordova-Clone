
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
 * navigator.geolocation
 */
navigator.geolocation = {

	getCurrentPosition: function(geolocationSuccess, geolocationError, geolocationOptions) {
		
	},

	watchPosition: function() {

	},

	clearWatch: function(){

	}
};
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
	}

	this.repairConfig = function() {
		//TODO: If the JSON object get's damaged or lost
		// Build a new one
	};
	


	// Let's make this a singleton
	if(CordovaClone.prototype.singleton) {
		return CordovaClone.prototype.singleton;
	}

	this.readConfig();

	CordovaClone.prototype.singleton = this;
	return this;
};
/**
 * Bootstrapper
 */
(function() {
	console.log('Brewing the coffee...');

	var deviceEvent = new Event('deviceready');
	document.addEventListener('deviceready', main);
	document.dispatchEvent(deviceEvent);
})();
