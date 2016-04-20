'use strict';

angular.module('myApp.config', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/config', {
            templateUrl: 'views/config/config.html',
            controller: 'ConfigController',
            title: 'Configuration'
        });
    }])

    .controller('ConfigController', ['$scope', 'ApiClientService', function($scope, ApiClientService) {
        $scope.taskType = 'file';
        $scope.sequenceStart = 0;
        $scope.sequenceStop = 100;

        ApiClientService.getProviders();
    }]);