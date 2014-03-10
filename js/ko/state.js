/**
 * MobRuns state machine handler
 */
define(function () {
    return function (vm) {
        var self = this;
        self.vm = vm;

        self.state = {
            startTimer: function () {},
            viewTimes: function () {},
            pause: function () {},
            resume: function () {},
            discard: function () {},
            record: function () {},
            login: function () {
                vm.headerAnimate("slide-out-top");
                vm.startButtons({
                    opacity: 1
                });
                self.setLoggedInState();
            },
        };

        self.setLoggedInState = function () {
            self.state = {
                pause: function () {},
                resume: function () {},
                discard: function () {},
                record: function () {},
                login: function () {},
            };
            self.state.startTimer = function () {
                vm.startTimer();
                self.setStartTimerState();
            };
            self.state.viewTimes = function () {
                vm.viewTimes();
                self.setViewTimesState();
            };
        };

        self.setStartTimerState = function () {
            self.state.startTimer = function () {};
            self.state.pause = function () {
                vm.pause();
                self.setPauseState();
            };
        };

        self.setPauseState = function () {
            self.state.pause = function () {};
            self.state.record = function () {
                vm.record();
                self.setLoggedInState();
            };
            self.state.discard = function () {
                vm.discard();
                self.setLoggedInState();
            };
            self.state.resume = function () {
                vm.resume();
                self.setStartTimerState();
            };
        };

        self.setViewTimesState = function () {
            self.state.startTimer = function () {};
            self.state.viewTimes = function () {};
        };
    };
});
