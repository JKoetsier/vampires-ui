/**
 * Results View
 * @namespace Views
 */

(function() {
    'use strict';

    angular
        .module('vampUi.views.results', ['ngRoute'])
        .config(['$routeProvider', ResultsRoutes])
        .controller('ResultsController', [
            '$scope',
            'ExecutionHelperService',
            'Execution',
            'Configuration',
            'Resource',
            '$routeParams',
            'ExecutionDataExtractService',
            ResultsController
        ]);

    /**
     * @namespace ResultsRoutes
     * @desc Routes for the results view
     * @memberOf Views
     */
    function ResultsRoutes($routeProvider) {
        $routeProvider.when('/results/:id', {
            templateUrl: 'views/results/results.html',
            controller: 'ResultsController',
            title: 'Results'
        }).when('/results', {
            templateUrl: 'views/results/results.html',
            controller: 'ResultsController',
            title: 'Results'
        });
    }


    /**
     * @namespace ResultsController
     * @desc Controller for the results view
     * @memberOf Views
     */
    function ResultsController($scope,
                               ExecutionHelperService, Execution,
                               Configuration, Resource, $routeParams,
                               ExecutionDataExtractService) {

        $scope.sortBy = 'duration';
        $scope.sortRevers = false;
        $scope.errorMessage = null;

        $scope.execution = null;

        /* Returns the execution from which to show results */
        $scope.getExecution = function getExecution() {
            var execution = null;

            if ($scope.execution) {
                return $scope.execution;
            }

            if ($routeParams.id) {
                execution = new Execution();
                execution.setId($routeParams.id);
            } else if (ExecutionHelperService.getExecution()) {
                execution = ExecutionHelperService.getExecution();
            }

            $scope.execution = execution;

            return execution;
        };

        $scope.getResults = function getResults() {

            var execution = $scope.getExecution();

            execution.getStatus(function (status) {
                ExecutionDataExtractService.setData(status.info);

                if (status.type == 'full') {
                    $scope.isFull = true;
                } else {
                    $scope.isFull = false;
                }

                $scope.networkSpeeds = ExecutionDataExtractService.getNetworkSpeeds();
                $scope.cpuUsages = ExecutionDataExtractService.getCpuLoads();
                $scope.networkCounters = ExecutionDataExtractService.getNetworkCounters();
                $scope.costStats = ExecutionDataExtractService.getCostStatistics();
                $scope.loaded = true;

            });
        };

        $scope.doFull = function doFull() {
            var haveSelection = false;
            for (var c in $scope.costStats) {
                if ($scope.costStats[c].count && $scope.costStats[c].count > 0) {
                    haveSelection = true;
                    break;
                }
            }

            if (!haveSelection) {
                $scope.errorMessage = 'You must select at least one resource';
                return;
            } else {
                $scope.errorMessage = null;
            }

            Execution.get($scope.execution.id, function (execution) {
                var confDescription = execution.configuration.description;
                execution.getWorkload(function (workload) {
                    var config = new Configuration();
                    var resources = [];

                    for (var key in $scope.costStats) {

                        if ($scope.costStats[key].count &&
                            $scope.costStats[key].count > 0) {

                            var splittedKey = key.split(':');
                            console.log(splittedKey);
                            resources.push(new Resource({
                                provider: splittedKey[0].toLowerCase(),
                                type: splittedKey[1],
                                count: $scope.costStats[key].count
                            }));
                        }
                    }

                    config.setResources(resources);
                    config.setDescription('FULL: ' + confDescription);
                    config.save(function (conf) {
                        ExecutionHelperService.setConfiguration(conf);
                        ExecutionHelperService.setWorkload(workload);
                        ExecutionHelperService.setFull();

                        ExecutionHelperService.doNextStep();
                    });
                });

            });

        };


        $scope.getResults();
    }
})();

