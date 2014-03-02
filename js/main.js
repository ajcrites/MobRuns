/**
 * require.js configuration and code initialization
 */
require.config({
    paths: {
        jquery: "//ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min",
        knockout: "//cdnjs.cloudflare.com/ajax/libs/knockout/3.0.0/knockout-min",
        firebase: "https://cdn.firebase.com/v0/firebase",
    },
    shim: {
        firebase: {
            exports: "Firebase",
        },
    }
});

require(['config', 'app'], function (config, app) {
    app.run(config);
});
