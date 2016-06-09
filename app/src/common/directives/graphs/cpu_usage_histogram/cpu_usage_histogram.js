/**
 * CpuUsageHistogram Directive
 * @namespace Directives
 */

(function() {
    'use strict';

    var scripts = document.getElementsByTagName('script');
    var currentScriptPath = scripts[scripts.length-1].src;

    angular
        .module('vampUi.directives.graphs.cpuUsageHistogram', [])
        .directive('cpuUsageHistogram', cpuUsageHistogram);

    /**
     * @namespace CpuUsageHistogram
     * @desc Histogram for CPU usage
     * @memberOf Directives
     */
    function cpuUsageHistogram() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: currentScriptPath.replace('cpu_usage_histogram.js',
                'cpu_usage_histogram.html'),
            scope: true,
            link: function (scope, elem, attrs) {

                scope.$watch('update', function () {
                    scope.updateData();
                });

                scope.showData = function showData(data) {
                    scope.selected = data.data;
                    scope.updateData();
                };

                scope.histogramOptions =
                {
                    chart: {
                        type: "multiBarChart",
                        height: 450,
                        margin: {
                            top: 20,
                            right: 20,
                            bottom: 45,
                            left: 45,
                        },
                        showLegend: false,
                        showControls: false,
                        clipEdge: true,
                        duration: 500,
                        stacked: true,
                        xAxis: {
                            axisLabel: "CPU Usage",
                            showMaxMin: true,
                            ticks: [0, 20, 40, 60, 80, 100],
                            domain: [0, 100]
                        },
                        yAxis: {
                            axisLabel: "Probability Density",
                            axisLabelDistance: -20,

                        }
                    }
                };

                if (scope.fixY) {
                    scope.histogramOptions.chart.yDomain = [0, 1];
                }


                scope.updateData = function updateData() {
                    var values;
                    var total;

                    if (!scope.selected) {
                        if (scope.cpuUsages) {
                            scope.selected = scope.cpuUsages.totals;
                        } else {
                            return;
                        }
                    }

                    values = {};

                    for (var i = 0; i <= 100; i++) {
                        values[i] = 0;
                    }

                    var cnt = 0;

                    for (var key in scope.selected) {
                        for (var j = 0; j < scope.selected[key].idle.count; j++) {
                            total = 0;
                            total += scope.selected[key].system.values[j];
                            total += scope.selected[key].user.values[j];
                            total += scope.selected[key].nice.values[j];

                            values[parseInt(total)] += 1;
                            cnt++;
                        }
                    }

                    if (cnt === 0) {
                        return;
                    }
                    var valuesList = [];

                    for (var k in values) {
                        if (!values.hasOwnProperty(k)) {
                            continue;
                        }

                        valuesList.push({
                            x: k,
                            y: values[k] / cnt
                        });
                    }

                    scope.data = [
                        {
                            key: 'cpu usage',
                            values: valuesList
                        }
                    ];

                    //scope.stats = scope.selected[key];

                    scope.update = false;


                };
            }
        };
    }
}());
