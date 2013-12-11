
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
 	},

 	/**
 	 * Stub with console echo. 
 	 * @param  {[type]} cameraSuccess [description]
 	 * @param  {[type]} cameraError   [description]
 	 * @return {[type]}               [description]
 	 */
 	cleanUp: function(cameraSuccess, cameraError) {
 		var cameraSuccess = typeof === 'function' ? cameraSuccess : function() {console.log("Camera clean up success")};
 		var cameraError = typeof === 'function' ? cameraError : function(message) {console.log("Camera error: " + message)};
 		cameraSuccess();
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


