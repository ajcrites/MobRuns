/**
 * Individual display time element
 */
define(["knockout"], function (ko) {
    return function (db, id, time, date, ms, distance, visible) {
        var self = this;

        self.id = id;
        self.time = time;
        self.date = date;
        self.ms = ms;
        self.distance = ko.observable(distance);
        self.visible = ko.observable(visible);

        self.hide = function () {
            self.visible(false);
            db.child(self.id).update({visible: false});
        };
    }
});
