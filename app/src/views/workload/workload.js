/**
 * Workload View
 * @namespace Views
 */

(function() {
    'use strict';

    angular
        .module('vampUi.views.workload', ['ngRoute'])
        .config(['$routeProvider', WorkloadRoutes])
        .controller('WorkloadController', [
            '$scope',
            'ExecutionHelperService',
            'Workload',
            WorkloadController])
        .directive('onReadFile', [
            '$parse',
            onReadFileDirective
        ]);

    /**
     * @namespace WorkloadRoutes
     * @desc Routes for the workload view
     * @memberOf Views
     */
    function WorkloadRoutes($routeProvider) {
        $routeProvider.when('/workload', {
            templateUrl: 'views/workload/workload.html',
            controller: 'WorkloadController',
            title: '1. Define your workload'
        });
    }

    /**
     * @namespace WorkloadController
     * @desc Controller for the workload view
     * @memberOf Views
     */
    function WorkloadController($scope, ExecutionHelperService, Workload) {

        $scope.taskType = 'file';
        $scope.sequenceStart = 0;
        $scope.sequenceStop = 100;
        $scope.providers = [];
        $scope.file = {};
        $scope.description = '';

        $scope.readContents = function readContents($contents) {
            $scope.file.contents = $contents;
        };

        $scope.createWorkload = function createWorkload() {
            if ($scope.newTask.$invalid)
                return;

            var task = $scope.taskType == 'file' ?
                $scope.file.contents : $scope.taskText;

            if (!task)
                return;

            var workload = new Workload();

            workload.setFromJson({
                task: task,
                sequence_start: $scope.sequenceStart,
                sequence_stop: $scope.sequenceStop,
                description: $scope.description
            });

            workload.save(function () {
                $scope.setWorkload(workload);
            });
        };

        $scope.setWorkload = function setWorkload(workload) {
            ExecutionHelperService.setWorkload(workload);
            ExecutionHelperService.doNextStep();
        };

        Workload.getAll(function (workloads) {
            $scope.workloads = workloads;

            if ($scope.workloads && $scope.workloads.length) {
                $scope.selectTask = $scope.workloads[0];
            }
        });

    }

    function onReadFileDirective ($parse) {
        return {
            restrict: 'A',
            scope: false,
            link: function (scope, element, attrs) {
                var fn = $parse(attrs.onReadFile);

                element.on('change', function (onChangeEvent) {
                    var reader = new FileReader();

                    reader.onload = function (onLoadEvent) {
                        scope.file.name = (onChangeEvent.srcElement ||
                            onChangeEvent.target).files[0].name;

                        scope.$apply(function () {
                            fn(scope, {$contents: onLoadEvent.target.result});
                        });
                    };

                    reader.readAsText(
                        (onChangeEvent.srcElement || onChangeEvent.target)
                            .files[0]);
                });
            }
        };
    }
}());

