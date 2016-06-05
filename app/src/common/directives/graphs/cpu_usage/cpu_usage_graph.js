(function() {
    'use strict';

    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length-1].src;

    angular.module('myApp')


        .directive('cpuUsageGraph', ['GRAPH_MIN_CPU_USAGE', function (GRAPH_MIN_CPU_USAGE) {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: currentScriptPath.replace('cpu_usage_graph.js', 'cpu_usage_graph.html'),
                scope: true,
                link: function (scope, elem, attrs) {


                    scope.showData = function showData(data) {
                        scope.selected = data.data;

                        scope.updateData();
                    };

                    scope.lineChartOptions = {
                        chart: {
                            type: 'lineChart',
                            height: 450
                        }
                    };

                    function getFormattedValues(obj) {
                        var result = [];
                        var total;
                        var hasUsage = false;

                        for (var i = 0; i < obj.idle.count; i++) {
                            total = 0;
                            total += obj.system.values[i];
                            total += obj.user.values[i];
                            total += obj.nice.values[i];

                            if (total > GRAPH_MIN_CPU_USAGE) {
                                hasUsage = true;
                            }

                            result.push({
                                x: i,
                                y: total
                            });
                        }

                        if (!hasUsage) {
                            return null;
                        }

                        return result;
                    }

                    scope.updateData = function updateData() {
                        var values;

                        if (!scope.selected) {
                            scope.selected = scope.cpuUsages.totals;
                        }

                        scope.data = [];

                        for (var key in scope.selected) {
                            values = getFormattedValues(scope.selected[key]);

                            if (!values) continue;
                            scope.data.push({
                                values: values,
                                key: 'cpu ' + key
                            });
                        }


                    };


                    scope.lineChartOptions.chart.yDomain = [0,100];
                }
            };

        }]);
}());
