define(["config", "firebase"], function (config) {
    return new Firebase(config.db);
});

/*
var usersRef = firebase.child("users");
var nikRef = usersRef.child("nik");

nikRef.push("foo");

nikRef.on("child_added", function () {
    console.log("add");
});
*/
