/**
 * Knockout ViewModel
 */

define(["jquery", "knockout", "ko/pubsub"], function ($, ko, pubsub) {
    return function () {
        var self = this;

        pubsub.subscribe(function (id) {
            console.log(id);
        }, self, "loggedIn");
    };
});
