define(["knockout", "ko/pubsub", "ko/vm"], function (ko, pubsub, vm) {
    /**
     * Handle result of authorized google+ sign in callback
     */
    window.signinCallback = function (authResult) {
        if (authResult['status']['signed_in']) {
            document.getElementById('signinButton').setAttribute('style', 'display: none');

            gapi.client.request({
                path: "/plus/v1/people/me",
                callback: function (user) {
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
            var s,
                po = document.createElement('script');

            document.querySelector("#signinButton span").setAttribute("data-clientid", config.clientid);

            ko.applyBindings(new vm);

            po.type = 'text/javascript';
            po.async = true;
            po.src = 'https://apis.google.com/js/client:plusone.js';

            s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(po, s);
        },
    }
});
