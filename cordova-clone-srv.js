/**
 * This is a small server to manage the config.json file
 */

// imports
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

// mimeTypes. If you need more append to the end
var mimeTypes = {
	'json': 'application/json',
	'css': 'text/css',
	'js': 'text/javascript',
	'html': 'text/html',
	'jpeq': 'image/jpeg',
	'png':  'image/png'
};


/**
 * Main entry into the server and callback to the request
 * event
 * @param  {http.IncomingMessage} request  
 * @param  {http.ServerResponse} response]
 * @return {void}
 */
function main(request,response) {
	// Any params?
	var params = url.parse(request.url, true);
	// Lookees like they want to configure. 
	
	if(params.query) {
		var data = null;
		fs.readFile('config/config.json', {encoding: 'utf8'}, function(err,contents) {
			var jsonObject = JSON.parse(contents);
			
			// What are we ladling?
			if(params.query.plugin == 'geolocation') {
				console.log("Configuring gelocation plugin");
			}
		});
	}

	var pathstring = path.join(process.cwd(), params.pathname);
	fs.exists(pathstring, function (exists) {
		if(exists) {
			fs.stat(pathstring, function(err, stats) {
				if(stats.isFile()) {
					var mimeType = mimeTypes[path.extname(pathstring).split(".")[1]];
					response.writeHead(200, {'Content-Type': mimeType,
									'Access-Control-Allow-Origin': '*'});
					fs.readFile(pathstring, {encoding: 'utf8'}, function(err, contents) {
						response.write(contents);
						response.end();
					});
				} else {
					response.writeHead(200, {'Content-Type': 'text/html'});
					fs.readFile('index.html', {encoding: 'utf8'}, function(err, contents) {
						response.write(contents);
						response.end();
					});
				}
			});
		} else {
			response.writeHead(200, {'Content-Type': 'text/html'});
			fs.readFile('index.html', {encoding: 'utf8'}, function(err, contents) {
				response.write(contents);
				response.end();
			});
		}
	});
	return;
}



// Create the Server
http.createServer(main).listen(9999, "localhost");

console.log("Ladling the soup...");
console.log("Cordova-Clone Server is now running on http:///localhost:9999");
console.log("Navigate to http://localhost:9999/ to configure pulgin settings");
