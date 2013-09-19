/** This file holds the main function for the settings configurator **/

var cordovaClone = null;
$(document).ready(function(e) {
	$('#tabs').tabs();
	$('input[type=button]').button();
	cordovaClone = new CordovaClone();

	console.log("Coffee's made.");
});

/**
 * Stub for CordovaClone deviceready event
 * @return {[type]} [description]
 */
function main() {}