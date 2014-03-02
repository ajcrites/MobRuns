define(['knockout'], function (ko) {
    return function () {
        this.counter = ko.observable(0);
        this.running = ko.observable(false);
    };
});
