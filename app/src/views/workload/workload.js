(function() {
    'use strict';

    angular.module('myApp.workload', ['ngRoute'])

        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/workload', {
                templateUrl: 'views/workload/workload.html',
                controller: 'WorkloadController',
                title: '1. Define your workload'
            });
        }])

        .controller('WorkloadController', ['$scope', 'ExecutionHelperService', 'Workload',
            function($scope, ExecutionHelperService, Workload) {

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
                        sequenceStart: $scope.sequenceStart,
                        sequenceStop: $scope.sequenceStop,
                        description: $scope.description
                    });

                    workload.save(function() {
                        $scope.setWorkload(workload);
                    });
                };

                $scope.setWorkload = function setWorkload(workload) {
                    ExecutionHelperService.setWorkload(workload);
                    ExecutionHelperService.doNextStep();
                };

                Workload.getAll(function(workloads) {
                    $scope.workloads = workloads;

                    if ($scope.workloads && $scope.workloads.length) {
                        $scope.selectTask = $scope.workloads[0];
                    }
                });

            }])

        .directive('onReadFile', ['$parse', function ($parse) {
            return {
                restrict: 'A',
                scope: false,
                link: function(scope, element, attrs) {
                    var fn = $parse(attrs.onReadFile);

                    element.on('change', function(onChangeEvent) {
                        var reader = new FileReader();

                        reader.onload = function(onLoadEvent) {
                            scope.file.name = (onChangeEvent.srcElement || onChangeEvent.target).files[0].name;

                            scope.$apply(function() {
                                fn(scope, {$contents:onLoadEvent.target.result});
                            });
                        };

                        reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
                    });
                }
            };
        }]);
}());

