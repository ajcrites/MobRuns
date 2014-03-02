# MobRuns 0.0

Simple stopwatch utility for recording running times.

Individual users are identified by Google+ login.  Login
with Google+ and start recording your times.

## Installation
Pure front-end, so all you need is a server and the files.
Copy `js/sample.config.js` to `js/config.js` and update
the properties accordingly.

### Google+ Login
You can create a Google Developer project via the
[Google Developer Console](https://console.developers.google.com/)

Under APIs & auth > Credentials, you can *CREATE NEW CLIENT
ID* to acquire the `Client ID` property to use with the
configuration.  Remember to update *Javascript Origins*
appropriately (for development and deployment).

### Firebase
[Log into Firebase](https://www.firebase.com/).  Your
account console should have the URL to your database,
which you can substitute for the value in the config.

## TODO
* Add ability to record distance
* Add `undo` functionality for removed time
* http://stackoverflow.com/questions/22124022/gather-initial-data-and-act-on-subsequent-child-added
