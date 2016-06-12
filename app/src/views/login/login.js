/**
 * Login View
 * @namespace Views
 */

(function() {
    'use strict';

    angular
        .module('vampUi.views.login', ['ngRoute'])
        .config(['$routeProvider', LoginRoutes])
        .controller('LoginController', [
            '$scope',
            'AuthService',
            '$routeParams',
            '$location',
            LoginController
        ]);


    /**
     * @namespace LoginRoutes
     * @desc Routes for the login view
     * @memberOf Views
     */
    function LoginRoutes($routeProvider) {
        $routeProvider.when('/login/:redirect', {
            templateUrl: 'views/login/login.html',
            controller: 'LoginController',
            title: 'Login'
        }).when('/login', {
            templateUrl: 'views/login/login.html',
            controller: 'LoginController',
            title: 'Login'
        });
    }


    /**
     * @namespace LoginController
     * @desc Controller for the login view
     * @memberOf Views
     */
    function LoginController($scope, AuthService, $routeParams, $location) {

        $scope.error = null;

        $scope.login = function login() {
            if ($scope.user && $scope.pass) {
                AuthService.logIn($scope.user, $scope.pass, function (result) {
                    if (result) {
                        if ($routeParams.redirect) {
                            $location.path($routeParams.redirect);
                        } else {
                            $location.path('/');
                        }
                    } else {
                        $scope.error = 'Invalid credentials';
                    }
                });
            }
        };
    }
}());

