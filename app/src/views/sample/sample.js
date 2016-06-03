(function() {
    'use strict';

    angular.module('myApp.sample', ['ngRoute'])

        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/sample', {
                templateUrl: 'views/execute/execute.html',
                controller: 'ExecuteController',
                title: 'Running sampling',
                type: 'sample'
            });
        }]);
}());


