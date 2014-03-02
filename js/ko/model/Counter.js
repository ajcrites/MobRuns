/**
 * Model with the specific job of managing the pre-stopwatch countdown
 */
define(['knockout'], function (ko) {
    return function () {
        this.counter = ko.observable(0);
        this.running = ko.observable(false);
    };
});
