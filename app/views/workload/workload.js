'use strict';

angular.module('myApp.workload', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/workload', {
            templateUrl: 'views/workload/workload.html',
            controller: 'WorkloadController',
            title: '1. Define your workload'
        });
    }])

    .controller('WorkloadController', ['$scope', 'ApiClientService', 'ExecutionHelperService',
            function($scope, ApiClientService, ExecutionHelperService) {

        $scope.taskType = 'file';
        $scope.sequenceStart = 0;
        $scope.sequenceStop = 100;
        $scope.providers = [];
        $scope.file = {};
        $scope.description = '';

        $scope.readContents = function readContents($contents) {
            $scope.file.contents = $contents;

            console.log($scope.file);
        };

        $scope.createWorkload = function createWorkload() {
            if ($scope.newTask.$invalid)
                return;

            var task = $scope.taskType == 'file' ?
                                    $scope.file.contents : $scope.taskText;

            if (!task)
                return;

            var workload = {
                task: task,
                sequenceStart: $scope.sequenceStart,
                sequenceStop: $scope.sequenceStop,
                description: $scope.description
            };

            console.log(workload);

            ApiClientService.workloads.add(workload, function(workload) {

                $scope.selectWorkload(workload.id);
            });

        };

        $scope.selectWorkload = function selectWorkload(workloadId) {
            console.log('Selected workload ' + workloadId);

            ExecutionHelperService.setWorkloadId(workloadId);
            ExecutionHelperService.doNextStep();
        };

        ApiClientService.workloads.getAll(function(workloads) {
            $scope.workloads = workloads;

            if ($scope.workloads && $scope.workloads.length) {
                $scope.selectTask = $scope.workloads[0].id;
            }


        })
    }])

    .directive('onReadFile', function ($parse) {
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
    });