(function() {
    'use strict';

    angular.module('myApp.login', ['ngRoute'])

        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/login/:redirect', {
                templateUrl: 'views/login/login.html',
                controller: 'LoginController',
                title: 'Login'
            }).when('/login', {
                templateUrl: 'views/login/login.html',
                controller: 'LoginController',
                title: 'Login'
            });
        }])

        .controller('LoginController', ['$scope', 'Auth', '$routeParams', '$location', function($scope, Auth, $routeParams, $location) {

            $scope.error = null;

            $scope.login = function login() {
                if ($scope.user && $scope.pass) {
                    Auth.logIn($scope.user, $scope.pass, function(result) {
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
        }]);
}());

