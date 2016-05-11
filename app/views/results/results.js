'use strict';

angular.module('myApp.results', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/results', {
            templateUrl: 'views/results/results.html',
            controller: 'ResultsController',
            title: 'Results'
        });
    }])

    .controller('ResultsController', ['$scope', 'ExecutionHelperService', 'ApiClientService', function($scope, ExecutionHelperService, ApiClientService) {
        $scope.results = [];

        $scope.sortReverse = false;
        $scope.sortBy = 'time';
        $scope.yTicks = [];
        $scope.xTicks = [];
        $scope.data = [];
        $scope.selected = null;


        $scope.mockData = function() {
            $scope.results.push({
                time: 4.08,
                cost: 44.80,
                resources: '2x c3.medium, 1x c2.small'
            });

            $scope.results.push({
                time: 3.03,
                cost: 54.83,
                resources: '3x c3.medium'
            });

            $scope.results.push({
                time: 3.50,
                cost: 48.31,
                resources: '3x c2.medium'
            });
        };
        $scope.mockData();


        $scope.getResults = function getResults() {
            ApiClientService.configurations.getByWorkload(
                ExecutionHelperService.getWorkloadId(), function(data) {

                    $scope.results = data;
                    //data.forEach(function(conf) {
                    //
                    //    $scope.results.push(conf);
                    //})
                    $scope.showData();
                }
            )
        };

        $scope.showData = function showData() {
            $scope.results.forEach(function(result) {

            });
        };

        $scope.setSelected = function setSelected(result) {
            $scope.data[0].values.forEach(function(val) {
                val.size = 3;
            });

            result.size = 5;

            $scope.selected = result;
        };

        $scope.execute = function execute() {
            ExecutionHelperService.setConfigurationId($scope.selected.configuration_id);
            ExecutionHelperService.doNextStep();
        };


        $scope.data.push({key: '', values: []});

        var maxY = null;
        var maxX = null;

        $scope.results.forEach(function(result) {
            if (!maxX || result.time > maxX) maxX = result.time;
            if (!maxY || result.cost > maxY) maxY = result.cost;

            $scope.data[0].values.push({
                x: result.time,
                y: result.cost,
                size: 3,
                shape: 'circle',
                time: result.time,
                cost: result.cost,
                resources: result.resources,
                configuration_id: 'TEST_ID'
            });
        });


        for (var i = 0; i < maxY + 1; i += 5) {
            $scope.yTicks.push(i);
        }
        for (var i = 0; i < maxX + 1; i++) {
            $scope.xTicks.push(i);
        }

        $scope.xDomain = [0, maxX];
        $scope.yDomain = [0, maxY];

        $scope.options = {
            chart: {
                type: 'scatterChart',
                height: 450,
                color: d3.scale.category10().range(),
                scatter: {
                    onlyCircles: false,
                    dispatch: {
                        elementClick: function(e) {
                            $scope.setSelected(e.point);
                            $scope.$apply();
                        }
                    }
                },
                showDistX: true,
                showDistY: true,
                duration: 350,
                xAxis: {
                    axisLabel: 'Time (hrs)',
                    tickValues: $scope.xTicks,
                    tickFormat: function(d){
                        return d3.format('.02f')(d);
                    }
                },
                yAxis: {
                    axisLabel: 'Cost (USD)',
                    tickValues: $scope.yTicks,
                    tickFormat: function(d){
                        return d3.format('.02f')(d);
                    },
                    axisLabelDistance: -5
                },
                xDomain: $scope.xDomain,
                yDomain: $scope.yDomain,
                showLegend: false,
                zoom: {
                    enabled: true,
                    scaleExtent: [1, 10],
                    useFixedDomain: false,
                    useNiceScale: true,
                    horizontalOff: false,
                    verticalOff: false,
                    unzoomEventType: 'dblclick.zoom'
                }
            }
        };

    }]);