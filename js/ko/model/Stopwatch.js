/**
 * Model that handles the display of the stopwatch and records the
 * intervals (groups of start and end times) to represent the
 * total recorded time
 */
define(["knockout", "ko/model/Interval", "util"], function (ko, Interval, util) {
    var StopWatch = function () {
        // Group of start/stop times
        this.intervals = ko.observableArray();

        // setInterval value (to be cleared)
        this.intervalKeeper;

        // The current interval
        this.interval = null;

        /**
         * Display the current stopwatch tracked time
         */
        this.text = ko.computed(function () {
            var seconds, minutes,
                ms = 0;

            // Iterate over all recorded intervals to create a recorded
            // ms for display
            ko.utils.arrayForEach(this.intervals(), function (interval) {
                ms += interval.end().getTime() - interval.start().getTime();
            });
            return util.displayTime(ms);
        }, this);
    };

    StopWatch.prototype = {
        /**
         * Start the stopwatch.  Intervals start with both the same start
         * and end times and the interval created by `go` increments
         * the end time.
         *
         * Separate intervals are needed each time the watch is started
         * to calculate the correct aggregate time.
         */
        start: function () {
            this.interval = new Interval(new Date, new Date);
            this.intervals.push(this.interval);
            this.go();
        },

        pause: function () {
            clearInterval(this.intervalKeeper);
        },

        /**
         * Set up the timer display interval.  This changes the end time
         * of the current interval (thus updating the display via data binding)
         */
        go: function () {
            // Used for calculating random number for HSL.  The `count`
            // is done to change body background every second while using
            // the same interval
            var rand = function (min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }, count = 0;

            // Every 10th of a second, update the timer
            this.intervalKeeper = setInterval(function () {
                this.interval.end(new Date);

                count++;

                // Play with body ... something we all love to do
                if (!(count % 10)) {
                    document.body.style.background = "hsl(" + rand(0, 360)
                        + "," + rand(70, 100) + "%," + rand(35, 55) + "%)";
                }
            }.bind(this), 100);
        },

        reset: function () {
            this.intervals([]);
            this.interval = null;
        }
    };

    return StopWatch;
});
