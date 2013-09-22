/**
 * This holds the notification plugin
 */
navigator.notification = {

	alert: function(message, alertCallBack, title, buttonName) {
		alert(message);
		// Browser doesn't provide call back so mock it.
		if(alertCallBack) {
			alertCallBack();
		}
	},

	confirm: function(message, confirmCallBack, title, buttonLabels) {
		confirm(message);
		if(confirmCallBack) {
			confirmCallBack();
		}
	},

	prompt: function(message, promptCallBack, title, buttonLabels, defaultText) {
		var defaultText = typeof defaultText !== 'undefined' ? defaultText : '';

		prompt(message, defaultText);

		if(promptCallBack) {
			promptCallBack();
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