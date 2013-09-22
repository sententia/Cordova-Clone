/**
 *  Holds the device object
 */
document.addEventListener("config_updated", function() {
	window.device = cordovaClone.jsonObject.device;
})