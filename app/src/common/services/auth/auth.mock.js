(function() {
    'use strict';

    angular
        .module('vampUi.services.auth.mock', [])
        .factory('AuthServiceMock', [
            AuthServiceMock
        ]);


    function AuthServiceMock() {

        var factory = {};
        var base64 = null;

        factory.isLoggedIn = function isLoggedIn() {
            return base64 ? true : false;
        };


        /* Valid login if user === pass */
        factory.logIn = function logIn(user, pass, cb) {

            if (user === pass) {
                base64 = true;
                cb(true);
            } else {
                base64 = false;
                cb(false);
            }
        };

        return factory;

    }
}());

