(function() {
    'use strict';

    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length-1].src;

    angular.module('myApp')


        .directive('networkSpeedsHistogram', [function () {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: currentScriptPath.replace('network_speeds_histogram.js', 'network_speeds_histogram.html'),
                scope: true,
                link: function (scope, elem, attrs) {
                    scope.selectedInterface = null;
                    scope.selectedType = 'rx';

                    scope.$watch('update', function() {
                        scope.updateData();
                    });

                    scope.showData = function showData(data) {
                        scope.selected = data.data;

                        if (!scope.selectedInterface) {
                            for (var type in scope.selected) {
                                for (var iface in scope.selected[type]) {
                                    scope.selectedInterface = iface;
                                    break;
                                }
                                break;
                            }
                        }
                        scope.updateData();
                    };

                    scope.histogramOptions = {
                        "chart": {
                            "type": "multiBarChart",
                            "height": 450,
                            "margin": {
                                "top": 20,
                                "right": 20,
                                "bottom": 45,
                                "left": 45,
                            },
                            showLegend: true,
                            showControls: false,
                            "clipEdge": true,
                            "duration": 500,
                            "stacked": false,
                            "xAxis": {
                                "axisLabel": "Network Speeds",
                                showMaxMin: true,
                                //ticks: [0, 20, 40, 60, 80, 100],
                                //domain: [0, 100]
                            },
                            "yAxis": {
                                "axisLabel": "Probability Density",
                                "axisLabelDistance": -20,

                            }
                        }
                    };

                    if (scope.fixY) {
                        scope.histogramOptions.chart.yDomain = [0, 1];
                    }


                    scope.updateData = function updateData() {
                        var valuesList;
                        var total, max;
                        var bins = 100;

                        if (!scope.selected) {
                            if (scope.networkSpeeds) {
                                scope.selected = scope.networkSpeeds.totals;
                            } else {
                                return;
                            }

                        }

                        function getMaxOfArray(numArray) {
                            return Math.max.apply(null, numArray);
                        }

                        scope.data = [];

                        var iface = scope.selectedInterface;
                        var type = scope.selectedType;

                        if (!type || !iface) return;
                        max = getMaxOfArray(scope.selected[type][iface].values);

                        if (max === 0) {
                            return;
                        }

                        var binSize = parseInt(max / bins);
                        var histogram = {};

                        total = 0;
                        valuesList = [];

                        for (var i = binSize; i <= max; i += binSize) {
                            histogram[i] = 0;
                        }

                        for (var value in scope.selected[type][iface].values) {

                            for (var b in histogram) {
                                if (scope.selected[type][iface].values[value] > b) {
                                    continue;
                                }
                                histogram[b]++;
                                break;
                            }

                            total++;
                        }

                        for (var k in histogram) {
                           valuesList.push({
                               x: k,
                               y: histogram[k] / total
                           });
                        }
                        scope.data.push({
                            key: iface + ' ' + type,
                            values: valuesList
                        });

                        scope.stats = scope.selected[type][iface];

                    };
                }
            };

        }]);
}());
