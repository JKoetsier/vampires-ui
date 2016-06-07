(function() {
    'use strict';

    angular.module('myApp.results', ['ngRoute'])

        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/results/:id', {
                templateUrl: 'views/results/results.html',
                controller: 'ResultsController',
                title: 'Results'
            }).when('/results', {
                templateUrl: 'views/results/results.html',
                controller: 'ResultsController',
                title: 'Results'
            });
        }])

        .controller('ResultsController', ['$scope', 'ExecutionHelperService',
            'ApiClientService', 'Execution', '$routeParams', 'ExecutionDataExtractService', function($scope, ExecutionHelperService, ApiClientService, Execution, $routeParams, ExecutionDataExtractService) {

                $scope.sortBy = 'duration';
                $scope.sortRevers = false;

                /* Returns the execution from which to show results */
                $scope.getExecution = function getExecution() {
                    var execution = null;

                    if ($routeParams.id) {
                        execution = new Execution();
                        execution.setId($routeParams.id);
                    } else if (ExecutionHelperService.getExecution()) {
                        execution = ExecutionHelperService.getExecution();
                    }

                    return execution;
                };

                $scope.getResults = function getResults() {

                    var execution = $scope.getExecution();

                    execution.getStatus(function(status) {
                        ExecutionDataExtractService.setData(status.info);
                        $scope.networkSpeeds = ExecutionDataExtractService.getNetworkSpeeds();
                        $scope.cpuUsages = ExecutionDataExtractService.getCpuLoads();

                        $scope.networkCounters = ExecutionDataExtractService.getNetworkCounters();

                        $scope.costStats = ExecutionDataExtractService.getCostStatistics();
                        $scope.loaded = true;

                        console.log($scope.costStats);

                    });
                };


                $scope.getResults();
            }]);
})();

