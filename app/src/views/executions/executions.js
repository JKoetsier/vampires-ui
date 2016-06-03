(function() {
    'use strict';

    angular.module('myApp.executions', ['ngRoute'])

        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/executions', {
                templateUrl: 'views/executions/executions.html',
                controller: 'ExecutionsController',
                title: 'Executions'
            });
        }])

        .controller('ExecutionsController', ['$scope', 'ExecutionHelperService', 'Execution',
            function($scope, ExecutionHelperService, Execution) {

                $scope.getExecutions = function getExecutions() {
                    Execution.getAll(function(executions) {
                        $scope.executions = executions;

                        console.log($scope.executions);
                    });
                };

                $scope.getExecutions();

            }]);
}());

