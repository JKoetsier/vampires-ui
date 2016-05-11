'use strict';

angular.module('myApp.sample', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/sample', {
            templateUrl: 'views/sample/sample.html',
            controller: 'ExecuteController',
            title: 'Running sampling',
            type: 'sampling'
        });
    }]);
