/**
 * Database connection/utility
 */
define(["config", "firebase"], function (config) {
    return new Firebase(config.db);
});
