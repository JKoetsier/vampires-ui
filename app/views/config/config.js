'use strict';

angular.module('myApp.config', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/config', {
            templateUrl: 'views/config/config.html',
            controller: 'ConfigController',
            title: 'Configuration'
        });
    }])

    .controller('ConfigController', [function() {

    }]);