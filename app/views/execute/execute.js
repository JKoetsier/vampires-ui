'use strict';

angular.module('myApp.execute', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/execute', {
            templateUrl: 'views/execute/execute.html',
            controller: 'ExecuteController',
            title: 'Execute'
        });
    }])

    .controller('ExecuteController', [function() {

    }]);