'use strict';

angular.module('myApp.results', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/results', {
            templateUrl: 'views/results/results.html',
            controller: 'ResultsController',
            title: 'Results'
        });
    }])

    .controller('ResultsController', ['$scope', function($scope) {
        $scope.results = [];

        $scope.sortReverse = false;
        $scope.sortBy = 'time';

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

        $scope.options = {
            chart: {
                type: 'scatterChart',
                height: 450,
                color: d3.scale.category10().range(),
                scatter: {
                    onlyCircles: false
                },
                showDistX: true,
                showDistY: true,
                //tooltipContent: function(d) {
                //    return d.series && '<h3>' + d.series[0].key + '</h3>';
                //},
                duration: 350,
                xAxis: {
                    axisLabel: 'Time (hrs)',
                    tickFormat: function(d){
                        return d3.format('.02f')(d);
                    }
                },
                yAxis: {
                    axisLabel: 'Cost (USD)',
                    tickFormat: function(d){
                        return d3.format('.02f')(d);
                    },
                    axisLabelDistance: -5
                },
                zoom: {
                    //NOTE: All attributes below are optional
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

        $scope.data = [];
        $scope.data.key = 'Group';
        $scope.data.values = [];

        $scope.data.push({key: 'Group', values: []});

        $scope.results.forEach(function(res, i) {

            $scope.data[0].values.push({
                x: res.time,
                y: res.cost,
                size: 1,
                shape: 'circle'
            });

        });

    }]);