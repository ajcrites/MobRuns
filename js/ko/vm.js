/**
 * Knockout ViewModel
 */

define([
    "jquery", "knockout", "ko/pubsub",
    "ko/model/Counter", "ko/model/Stopwatch"
],
function (
    $, ko, pubsub,
    Counter, Stopwatch
) {
    return function () {
        var self = this;

        // Default header animation (show it immediately)
        self.headerAnimate = ko.observable("slidein");

        // Hide some other elements
        self.startButtons = ko.observable(0);
        self.showStopwatch = ko.observable(false);

        // Set up models
        self.countdown = new Counter;
        self.countdown.counter(0);
        self.countdown.running(false);

        self.stopwatch = new Stopwatch;

        // On the `loggedIn` event (courtesy of Google),
        // remove the header and display the starting buttons
        // (after some time for animation purposes)
        pubsub.subscribe(function (id) {
            setTimeout(function () {
                self.headerAnimate("slideout");
                self.startButtons(1);
            }, 600);
        }, self, "loggedIn");

        pubsub.subscribe(function () {
            self.showStopwatch(true);
            self.stopwatch.start();
        }, self, "countdownEnd");

        // Once play is clicked, give a short countdown so
        // runners can get their bearings before taking off
        // Then, start tracking the time
        self.startTimer = function () {
            var cdi,
                cd = 3;

            // fade out the start buttons
            self.startButtons(0);

            // start the countdown timer
            self.countdown.running(true);

            // The countdown timer will fire off an event to start
            // the stopwatch once it reaches 0
            cdi = setInterval(function () {
                if (0 == cd) {
                    clearInterval(cdi);
                    self.countdown.counter(0);
                    self.countdown.running(false);
                    pubsub.notifySubscribers(null, "countdownEnd");
                }
                else {
                    self.countdown.counter(cd);
                    cd--;
                }
            }, 1000);
        };
    };
});
