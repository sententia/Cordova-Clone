/**
             @license @PERSERVED_COMMENT@ 
                */
/**
 * navigator.geolocation
 */
/**
 * Provide basic untilities
 */
cordovaClone = {

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
