(function() {
    'use strict';

    angular.module('myApp.start', ['ngRoute'])

        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/start', {
                templateUrl: 'views/start/start.html',
                controller: 'StartController',
                title: 'Welcome!'
            });
        }])

        .controller('StartController', [function() {

        }]);
}());

