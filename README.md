Cordova-Clone
=============

This is clone of the Cordova/Phonegap API. It is a clone in the sense that it allows for simulation on a desktop browser. 

***

How to use?
============

The Cordova Clone replaces the Cordova API with another *simpler* API which allows it to simulate all functionality in the browser. To get started you have to
* Copy the cordova-clone folder into your application (www) folder. 
* Link (script tag people) to the cordova-clone.js file in the cordova-clone folder. Make sure this is the last javascript file loaded before your own code. This is so the clone can replace the API objects. 
* Cowabunga!

For those who are lazy like the rest of us:

```html
<script src="cordova-clone/cordova-clone.js" type="text/javascript"></script>
```

If you would like to change the settings or data that you would get back from the api, such as geolocation, open the index.html file found in the cordova-clone folder and use the interface to change the necessary items.

**Please note**:
If you're not serving up your app from a local server, such as mobile.local, you will have to tell chrome to open up with file access. To do this use this flag: 

````
--allow-files-access-from-files
````
