/**
 * Allow for custom animations by assigning properties for the given element
 * that are transitionable.  This binding checks to see whether the element
 * is in flow (via the `display` property) and takes it and out appropriately
 * based on the incoming properties
 */
define(['jquery', 'knockout'], function ($, ko) {
    ko.bindingHandlers["animHandleFlow"] = {
        update: function (el, valueAccessor) {
            var seconds, currentTimeout,
                data = valueAccessor(),
                $el = $(el);

            if (data.opacity == 0) {
                seconds = $el.css("transition").replace(/opacity\s+([.\d]+)s.*/, "$1") * 1000;
                clearTimeout($el.data("currentTimeout"));
                currentTimeout = setTimeout(function () {
                    $el.css("display", "none");
                }, seconds);
                $el.data("currentTimeout", currentTimeout);
            }
            else {
                $el.css("display", "block");
                // If the element is currently animating out of view, the
                // timeout may fire *after* the above is run and knock the
                // element out of view.  Clear that timeout so the element
                // remains visible
                clearTimeout($el.data("currentTimeout"));
            }
            // This weird noop actually causes Chrome to trigger the transition
            // for the newly displayed elements.  Without it, they will just
            // pop-in initially
            $el.css("opacity");
            $el.css(data);
        }
    }
});
