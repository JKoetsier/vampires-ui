'use strict';

angular.module('myApp.progress', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/progress', {
            templateUrl: 'views/progress/progress.html',
            controller: 'ProgressController',
            title: 'Progress'
        });
    }])

    .controller('ProgressController', [function() {

    }]);