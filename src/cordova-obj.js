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