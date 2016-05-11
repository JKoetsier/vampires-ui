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

            if ($route.current.$$route.type == 'sampling') {
                $scope.settings = EXECUTION_SETTINGS.sampling;
            } else {
                $scope.settings = EXECUTION_SETTINGS.full;
            }

            $scope.startExecution = function startExecution() {
                var startLine;

                if ($scope.settings.type == 'sampling') {
                    startLine = 'Preparing Sampling..';
                } else {
                    startLine = 'Preparing Execution..';
                }

                $scope.addProgressLine(startLine);

                ApiClientService.executions.new(
                    ExecutionHelperService.getConfigurationId(),
                    ExecutionHelperService.getWorkloadId(), $scope.settings.type,
                    function(data) {

                        ExecutionHelperService.setExecutionId(data.id);
                        $scope.setStatus(data.status);
                        $scope.executionId = data.id;
                        $scope.startPolling();
                    })
            };

            $scope.addProgressLine = function addProgressLine(line) {
                if ($scope.progressText != '') {
                    $scope.progressText += '\r\n';
                }
                $scope.progressText += line;
            };

            $scope.startPolling = function startPolling() {
                $interval(function() {
                    $scope.checkStatus()
                }, $scope.settings.pollingInterval);
            };

            $scope.setStatus = function setStatus(status) {
                $scope.status = status;
                $scope.niceStatus = status[0].toUpperCase() + status.substr(1);
            };

            $scope.toResults = function toResults() {
                ExecutionHelperService.doNextStep();
            };

            $scope.checkStatus = function checkStatus() {

                ApiClientService.executions.getStatus(executionId, function(data) {
                    if ($scope.lastUpdate && $scope.lastUpdate ==
                        data._lastupdate_at) {
                        /* No update */
                        return;
                    }


                    $scope.progress = (data.total - data.remaining) / data.total * 100;

                    var newLine = $scope.progress + '% done. ' +
                        data.completed + ' of ' + data.total + ' completed';

                    if (data.failed > 0) {
                        newLine += ', ' + data.failed + ' failed';
                    }

                    if (data.remaining == 0) {
                        $scope.setFinished(data);
                    }
                    $scope.setStatus(data.status);
                    $scope.addProgressLine(newLine);
                });
            };

            $scope.setFinished = function setFinished(data) {
                $scope.done = true;
                $scope.addProgressLine('Done! ' + data.completed + ' of ' +
                    data.total + ' succeeded. ' + data.failed + ' failed');
            };

            $scope.killExecution = function killExecution() {
                ApiClientService.executions.changeStatus($scope.executionId, 'stop',
                    function(data) {

                        $scope.setStatus(data.status);
                    })
            };

            $scope.killExecution = function killExecution() {
                ApiClientService.executions.changeStatus($scope.executionId, 'kill',
                    function(data) {

                        $scope.setStatus(data.status);
                    })
            };

            $scope.startExecution();
        }]);