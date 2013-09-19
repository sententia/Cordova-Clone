Cordova-Clone
=============

This is a clone of the Cordova/Phonegap API. Well, Desktop Clone. See, there isn't much support for Debugging Phonegap/Cordova Applications, so the Cordova-Clone was born. This not a substitue for actual device testing, however it is more of a development time booster. The beauty in developing for the web is the turn around. The constant building and testing which you see with phone SDKs can be a drag. If you have the entire Cordova/Phonegap API built into the browser you can then iron out majority of the bugs before it even hits the phone for actual play. 

## Advantages
* Perform all the natural calls as you would with a real device
* Instant changes. Click refresh in the browser and Alakazam! 
* Use the power of a desktop Development toolset, such as firebug or Chrome Developer Tools

## Disadvantages
* It's not a subsitute for actual device play responsivness.

Current Status
==============

So the gates have just opened. Sententia will be building components of the api as needed for his apps. If you want one desperately please drop us a line. 

Contributing
=============

Please contribute anything is better then nothing. This is about building great apps with a great technology HTML5, CSS, and Javascript. Every one makes mistakes, but it is better you try and fail, then not try at all, so have a go at building a plugin. The more the merrier.


Requirements
============

Very little, in fact you most probably already have it. If you're using Phonegap 3.0 or above you already have the requirements. Phonegap 3.0 CLI needs **Node.js** and so does Cordova-Clone. That's it!


How to use?
============

The Cordova Clone replaces the Cordova API with another *simpler* API which allows it to simulate all functionality in the browser. To get started you have to
* Copy the cordova-clone folder into your application (www) folder. 
* Link (script tag people) to the cordova-clone.js file in the cordova-clone folder. Make sure this is the last javascript file loaded before your own code. This is so the clone can replace the API objects.
* Start the cordova-clone-srv.js with node.js
````
# node cordova-clone-srv.js
````
* To configure the settings of the plugins go to http://localhost:9999/.
* Cowabunga!

For those who are lazy like the rest of us:

```html
<script src="cordova-clone/cordova-clone.js" type="text/javascript"></script>
```

How does it work?
=================

Cordova-Clone works by replacing the API objects with its own. This means you get a dumbed down simulated version of the API. Everything (will be [It's coming... why not pitch in]) from Camera Capture to Device Info. It does this by using the Cordova-Clone Server. The server is the linkage between the config and cordova-clone. It can serve up images and resources to be used during execution which Cordova-Clone mimics as if it is the device. This enables you to develop your app as if you're on your device. 

Some quick resources!
======================

Of course this is not a substitute for acutal device play. You might find your device doesn't something funky when it tries to run. In saying that, here are some quick links on tools which allow you to test and debug on your phone:

* [Weinre - HTML/CSS Remote Inspector](http://people.apache.org/~pmuellr/weinre/docs/latest/)
* [jsHyBugger Community Edition - Javascript Debugger](http://www.jshybugger.org/)
* [jsHyBugger Pro Edition - Javascript Debugger and HTML/CSSRemote Inspection (Commerical)](https://www.jshybugger.com/#/)
* [Phonegap Build Debugger - Basically Weinre](http://phonegap.com) 
