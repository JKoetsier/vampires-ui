(function() {
    'use strict';

    angular.module('myApp.auth', [])

        .factory('AuthService', ['$http', 'API_URL', function($http, API_URL) {

            var factory = {};
            var base64 = null;

            base64 = btoa('admin:admin');

            factory.isLoggedIn = function isLoggedIn() {
                return base64 ? true : false;
            };

            factory.logIn = function logIn(user, pass, cb) {
                var b64 = btoa(user + ':' + pass);

                var config = {
                    headers: {
                        'Authorization': 'Basic ' + b64
                    }
                };
                $http.get(API_URL + '/workloads', config).then(
                    function successCallback(response) {
                        base64 = b64;
                        cb(true);
                    },
                    function errorCallback(response) {
                        base64 = null;
                        cb(false);
                    }
                );
            };

            factory.getBase64 = function getBase64() {
                return base64;
            };

            return factory;

        }]);
}());

