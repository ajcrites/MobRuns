/**
 * Model for user connected to the database
 */
define(["knockout", "db", "util", "ko/model/Time",], function (ko, db, util, Time) {
    var User = function () {
        // Times are displayed initially, so set up empty times until
        // we can query the DB
        this.times = ko.observableArray();
    };

    User.prototype = {
        /**
         * Once the user is logged in, its id is available.  Pass this
         * to the User model and initialize everything.  `id` is not
         * initially available, but the user must be because
         * `times` must be available for Knockout
         */
        setUser: function (id) {
            var self = this;

            // identify user by g+ unique ID
            self.userRef = db.child("users/" + id);

            // Respond to retrieval of data from the DB.  This is both
            // run initially and any time the snapshot is updated.
            // Ideally I could get `value` only once and then use
            // `child_added` et. al. to manipuliate the times array
            self.userRef.on("value", function (snapshot) {
                var ms, item, date, time,
                    obj = snapshot.val();

                // The snapshot contains everything
                self.times.removeAll();
                for (prop in obj) {
                    if (obj.hasOwnProperty(prop)) {
                        // All current properties of the time
                        time = obj[prop];
                        ms = 0;
                        item = {};

                        time.intervals.forEach(function (interval) {
                            ms += interval.end - interval.start;
                        });

                        ms = util.displayTime(ms);
                        date = new Date(time.date);
                        date = date.getFullYear() + "-" + ("" + date.getMonth()).pad(0, 2)
                            + "-" + ("" + date.getDate()).pad(0, 2);

                        self.times.push(new Time(self.userRef, prop, ms, date, time.date, time.distance, time.visible));

                        self.times.sort(function (left, right) {
                            return left.ms - right.ms;
                        });
                    }
                }
            });
        },

        // Store array of intervals to the DB
        recordTime: function (intervals) {
            var toRecord = [];

            // Intervals contain observables for start and end elements,
            // both of which are `Date`s.
            // Store as milliseconds for easy conversion
            intervals.forEach(function (interval) {
                toRecord.push({
                    start: interval.start().getTime(),
                    end: interval.end().getTime()
                });
            });

            this.userRef.push({
                intervals: toRecord,
                distance: "",
                // No deletion is done; just visibility
                visible: true,
                date: Date.now(),
            });
        },
    };

    return User;
});
