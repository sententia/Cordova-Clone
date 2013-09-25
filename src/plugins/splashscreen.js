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
