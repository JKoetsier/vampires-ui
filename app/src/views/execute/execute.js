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

        .controller('ExecuteController', ['ExecutionHelperService', 'ApiClientService',
            '$scope', '$route', '$interval', 'EXECUTION_SETTINGS',
            function(ExecutionHelperService, ApiClientService, $scope, $route, $interval,
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

                var pollingInterval;

                /* Set 'full' or 'sample' settings */
                $scope.settings = EXECUTION_SETTINGS[$route.current.$$route.type];

                $scope.startExecution = function startExecution() {
                    var startLine;

                    if ($scope.settings.type == 'sample') {
                        startLine = 'Preparing Sampling..';
                    } else {
                        startLine = 'Preparing Execution..';
                    }

                    $scope.addProgressLine(startLine);

                    ExecutionHelperService.createExecution($scope.settings.type, function(exec) {
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

                $scope.checkStatus = function checkStatus() {

                    $scope.execution.getStatus(function(status) {
                        status = status.info;
                        if ($scope.lastUpdate && $scope.lastUpdate == status.lastupdate_at) {
                            /* No update */
                            return;
                        }

                        if (status.status == 'starting') {
                            return;
                        }

                        $scope.lastUpdate = status.lastupdate_at;

                        $scope.progress = (status.total - status.remaining) / status.total * 100;

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

                $scope.killExecution = function killExecution() {
                    console.log('clicked kill');
                    $scope.execution.kill(function(data) {

                    });
                    //ApiClientService.executions.changeStatus($scope.executionId, 'stop',
                    //    function(data) {
                    //
                    //        $scope.setStatus(data.status);
                    //    });
                };

                $scope.stopExecution = function stopExecution() {
                    console.log('clicked stop');
                    $scope.execution.stop(function(data) {
                        $scope.stopped = true;

                    });
                };

                $scope.continueExecution = function continueExecution() {
                    console.log('clicked continue');
                    $scope.execution.start(function(data) {
                        $scope.stopped = false;
                    });
                };

                $scope.startExecution();
            }]);
}());

