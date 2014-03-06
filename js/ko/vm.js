/**
 * Knockout ViewModel
 */

define([
    "jquery", "knockout", "ko/pubsub",
    "ko/model/Counter", "ko/model/Stopwatch", "ko/model/User",
    "ko/custom-binding/anim-handle-flow"
],
function (
    $, ko, pubsub,
    Counter, Stopwatch, User
) {
    return function () {
        var self = this;

        // Default header animation (show it immediately)
        self.headerAnimate = ko.observable("slide-from-top");

        // Hide some other elements
        self.startButtons = ko.observable({
            opacity: 0
        });
        self.stopButton = ko.observable(0);
        self.pauseButtons = ko.observable(0);
        self.showStopwatch = ko.observable(false);
        self.showTimes = ko.observable(0);
        self.recorded = ko.observable({
            opacity: 0,
            top: 0,
        });
        self.discarded = ko.observable({
            opacity: 0,
            top: 0,
        });

        // Set up models
        self.countdown = new Counter;
        self.countdown.counter(0);
        self.countdown.running(false);

        self.stopwatch = new Stopwatch;

        // Need to set user so that the times observable exists
        // for the corresponding binding for the table
        self.user = new User;

        // On the `loggedIn` event (courtesy of Google),
        // remove the header and display the starting buttons
        // (after some time for animation purposes)
        pubsub.subscribe(function (id) {
            setTimeout(function () {
                self.headerAnimate("slide-out-top");
                self.startButtons({
                    opacity: 1
                });
            }, 600);

            self.user.setUser(id);
        }, self, "loggedIn");

        // Initial countdown ends, so start the stopwatch!
        pubsub.subscribe(function () {
            self.showStopwatch(true);
            self.stopwatch.start();
            self.stopButton(1);
        }, self, "countdownEnd");

        // Once play is clicked, give a short countdown so
        // runners can get their bearings before taking off
        // Then, start tracking the time
        self.startTimer = function () {
            var cdi,
                cd = 3;

            // fade out the start buttons
            self.startButtons({
                opacity: 0
            });

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

        // Display the table of recorded times for this user
        self.viewTimes = function () {
            self.startButtons({
                opacity: 0
            });
            self.showTimes(1);
            document.body.style.overflow = "auto";
        };

        // Pause the stopwatch
        self.pause = function () {
            self.stopwatch.pause();
            self.stopButton(0);
            self.pauseButtons(1);
        };

        // Resume a paused stopwatch
        self.resume = function () {
            self.stopwatch.start();
            self.stopButton(1);
            self.pauseButtons(0);
        };

        // Discard the current recorded time by creating a new stopwatch intervals
        self.discard = function () {
            self.stopwatch.reset();
            self.home();
            self.flash(self.discarded);
        };

        // Record the current stopwatch to the database and go home
        self.record = function () {
            self.user.recordTime(self.stopwatch.intervals());
            self.stopwatch.reset();
            self.home();

            self.flash(self.recorded);
        };

        // Display the main screen
        self.home = function () {
            self.stopButton(0);
            self.pauseButtons(0);
            self.startButtons({
                opacity: 1
            });
            self.showTimes(0);
            self.showStopwatch(false);
            document.body.style.background = "linear-gradient(to bottom, #0000e1 58%,#9701b5 100%) no-repeat";
            document.body.style.overflow = "hidden";
            document.body.scrollTop = 0;
        };

        // Flash the provided message using CSS power (an observable)
        self.flash = function (item) {
            item({
                opacity: 1,
                top: "35%",
            });

            setTimeout(function () {
                item({
                    opacity: 0,
                    top: 0,
                });
            }, 1000);
        };
    };
});
