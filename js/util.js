define(["util"], function (util) {
    String.prototype.pad = function (padWith, padWidth) {
        var str = this;
        while (str.length < padWidth) {
            str = padWith + str;
        }
        return str;
    };
    return {
        displayTime: function (ms) {
            seconds = "" + parseInt(ms / 1000 % 60, 10);
            seconds = ("" + seconds).pad(0, 2);
            minutes = parseInt(ms / 60000 % 60, 10);
            // Get the 10th of a second
            ms = ("" + ms).substr(-3, 1);

            return minutes + ":" + seconds + "." + ms;
        },
    }
});
