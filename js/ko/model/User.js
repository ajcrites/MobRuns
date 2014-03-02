define(["knockout", "db", "util"], function (ko, db, util) {
    var User = function () {
        this.times = ko.observableArray();
    };

    User.prototype = {
        setUser: function (id) {
            var self = this;
            self.userRef = db.child("users/" + id);

            self.userRef.on("value", function (snapshot) {
                var ms, item, date, time,
                    obj = snapshot.val();

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

                        self.times.push({
                            time: ms,
                            date: date,
                            ms: time.date,
                            distance: time.distance,
                        });

                        self.times.sort(function (left, right) {
                            return left.ms - right.ms;
                        });
                    }
                }
            });
        },

        recordTime: function (intervals) {
            var toRecord = [];
            intervals.forEach(function (interval) {
                toRecord.push({
                    start: interval.start().getTime(),
                    end: interval.end().getTime()
                });
            });

            this.userRef.push({
                intervals: toRecord,
                distance: "",
                visible: true,
                date: Date.now(),
            });
        },
    };

    return User;
});
