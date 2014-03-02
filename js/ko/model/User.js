define(["knockout", "db"], function (ko, db) {
    var User = function (id) {
        this.userRef = db.child("users/" + id);
    };
    User.prototype = {
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
