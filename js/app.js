/**
 * Application code
 */
define(["knockout", "ko/pubsub", "ko/vm"], function (ko, pubsub, vm) {
    /**
     * Handle result of authorized google+ sign in callback
     * This is called initially whether the user is successfully logged in
     * or not, so display the signinButton if there is no auth.
     * Otherwise it should not be shown at all.
     */
    window.signinCallback = function (authResult) {
        if (authResult['status']['signed_in']) {
            document.getElementById('signinButton').setAttribute('style', 'display: none');

            gapi.client.request({
                path: "/plus/v1/people/me",
                callback: function (user) {
                    // Fire an event to indicate that the user has been logged in
                    pubsub.notifySubscribers(user.id, "loggedIn");
                }
            });
        }
        else {
            document.getElementById('signinButton').setAttribute('style', 'display: inline');
        }
    }

    return {
        run: function (config) {
            // Google's code for adding g+ signin button
            var s,
                po = document.createElement('script');

            // Set client-id from config (do not hard-code)
            document.querySelector("#signinButton span").setAttribute("data-clientid", config.clientid);

            // Apply knockout bindings so that the ViewModel can listen
            // for when the loggedIn notification is published
            ko.applyBindings(new vm);

            // More stuff from Google
            po.type = 'text/javascript';
            po.async = true;
            po.src = 'https://apis.google.com/js/client:plusone.js';

            s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(po, s);
        },
    }
});
