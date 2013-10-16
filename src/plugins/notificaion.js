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