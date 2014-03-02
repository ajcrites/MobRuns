/**
 * Model for recording start and end times (done via JavaScript date)
 */
define(["knockout"], function (ko) {
    return function (start, end) {
        this.start = ko.observable(start);
        this.end = ko.observable(end);
    };
});
