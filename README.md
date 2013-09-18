Cordova-Clone
=============

This is clone of the Cordova/Phonegap API. It is a clone in the sense that it allows for simulation on a desktop browser. 

***

How to use?
============

The Cordova Clone replaces the Cordova API with another *simpler* API which allows it to simulate all functionality in the browser. To get started you have to
* Copy the cordova-clone folder into your application (www) folder. 
* Link (script tag people) to the cordova-clone.js file in the cordova-clone folder. Make sure this is the last javascript file loaded before your own code. This is so the clone can replace the API objects.
* Start the cordova-clone-server.js with node.js
* To configure the settings of the plugins go to http://localhost:9999/config/index.html.
* Cowabunga!

For those who are lazy like the rest of us:

```html
<script src="cordova-clone/cordova-clone.js" type="text/javascript"></script>
```

