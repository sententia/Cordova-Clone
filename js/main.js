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
function main() {

	
	// Now run through the setup
	setupHandlers();
}

/**
 * Attaches all the handlers to the various dom elements of interaction
 * @return {void} 
 */
function setupHandlers() {

}