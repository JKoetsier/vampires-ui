(function() {
    'use strict';

    angular.module('myApp.execute', ['ngRoute'])

        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/execute', {
                templateUrl: 'views/execute/execute.html',
                controller: 'ExecuteController',
                title: 'Execute',
                type: 'full'
            });
        }])

        .controller('ExecuteController', ['ExecutionHelperService', 'ExecutionDataExtractService', 'ApiClientService',
            '$scope', '$route', '$interval', 'EXECUTION_SETTINGS',
            function(ExecutionHelperService, ExecutionDataExtractService, ApiClientService, $scope, $route, $interval,
                     EXECUTION_SETTINGS) {

                $scope.done = false;
                $scope.status = null;
                $scope.niceStatus = 'Preparing Execution..';
                $scope.executionId = null;
                $scope.lastUpdate = null;
                $scope.progress = 0;
                $scope.progressText = '';
                $scope.stopped = false;

                $scope.execution = null;
                $scope.type = null;

                var pollingInterval;

                /* Set 'full' or 'sample' settings */
                $scope.settings = EXECUTION_SETTINGS[$route.current.$$route.type];

                $scope.startExecution = function startExecution() {
                    var startLine;

                    if (ExecutionHelperService.isFull() || $scope.settings.type != 'sample') {
                        startLine = 'Preparing Execution..';
                        $scope.type = 'full';
                    } else {
                        startLine = 'Preparing Sampling..';
                        $scope.type = 'sample';
                    }

                    $scope.addProgressLine(startLine);

                    ExecutionHelperService.createExecution($scope.type, function(exec) {
                        $scope.execution = exec;
                        $scope.startPolling();
                    });
                };

                $scope.addProgressLine = function addProgressLine(line) {
                    if ($scope.progressText !== '') {
                        $scope.progressText += '\r\n';
                    }
                    $scope.progressText += line;
                };

                $scope.startPolling = function startPolling() {
                    pollingInterval = $interval(function() {
                        $scope.checkStatus();
                    }, $scope.settings.pollingInterval);
                };

                $scope.setStatus = function setStatus(status) {
                    if (status) {
                        $scope.status = status;
                        $scope.niceStatus = status[0].toUpperCase() + status.substr(1);
                    }

                };

                $scope.toResults = function toResults() {
                    ExecutionHelperService.doNextStep();
                };

                function isEmpty(obj) {
                    for(var prop in obj) {
                        if(obj.hasOwnProperty(prop))
                            return false;
                    }

                    return JSON.stringify(obj) === JSON.stringify({});
                }

                $scope.checkStatus = function checkStatus() {

                    $scope.execution.getStatus(function(status) {
                        if (status.info.status == 'running' && !isEmpty(status.info.status.histograms)) {
                            ExecutionDataExtractService.setData(status.info);
                            $scope.cpuUsages = ExecutionDataExtractService.getCpuLoads();
                            $scope.networkSpeeds = ExecutionDataExtractService.getNetworkSpeeds();
                            $scope.statsAvailable = true;
                            $scope.started = true;
                        }
                        status = status.info;

                        $scope.update = true;

                        if ($scope.lastUpdate && $scope.lastUpdate == status.lastupdate_at) {
                            /* No update */
                            return;
                        }

                        if (status.status == 'starting') {
                            return;
                        }

                        $scope.lastUpdate = status.lastupdate_at;

                        $scope.progress = parseFloat((status.total - status.remaining) / status.total * 100).toFixed(1);

                        var newLine = $scope.progress + '% done. ' +
                            status.completed + ' of ' + status.total + ' completed';

                        if (status.failed > 0) {
                            newLine += ', ' + data.failed + ' failed';
                        }

                        $scope.addProgressLine(newLine);
                        $scope.setStatus(status.status);

                        if (status.remaining === 0) {
                            $scope.setFinished(status);
                        }
                    });
                };

                $scope.setFinished = function setFinished(data) {
                    $scope.done = true;
                    $interval.cancel(pollingInterval);
                    $scope.addProgressLine('Done! ' + data.completed + ' of ' +
                        data.total + ' succeeded. ' + data.failed + ' failed');
                };

                $scope.stopExecution = function stopExecution() {
                    $scope.execution.stop(function(data) {
                        $scope.stopped = true;
                        $scope.done = true;
                        $interval.cancel(pollingInterval);

                        $scope.addProgressLine('Cancelled by user');
                    });
                };

                $scope.continueExecution = function continueExecution() {
                    $scope.execution.start(function(data) {
                        $scope.stopped = false;
                    });
                };

                $scope.startExecution();
            }]);
}());

