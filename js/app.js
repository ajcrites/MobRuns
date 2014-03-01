define(["knockout", "ko/vm"], function (firebase, ko, vm) {
    return {
        run: function (config) {
            ko.applyBindings(new vm);
        },
    }
});
