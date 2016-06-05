(function() {
    'use strict';

    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length-1].src;

    angular.module('myApp')


        .directive('networkSpeedGraph', function () {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: currentScriptPath.replace('network_speed_graph.js', 'network_speed_graph.html'),
                scope: true,
                link: function (scope, elem, attrs) {
                    scope.selectedInterfaces = {};

                    scope.showData = function showData(data) {
                        scope.selected = data.data;

                        console.log(scope.selected);
                        scope.updateData();
                    };

                    scope.lineChartOptions = {
                        chart: {
                            type: 'lineChart',
                            height: 450
                        }
                    };

                    scope.$watch('networkSpeeds', function() {
                        if (!scope.networkSpeeds || !('totals' in scope.networkSpeeds)) {
                            return;
                        }
                        scope.selected = scope.networkSpeeds.totals;


                        for (var key in scope.selected.tx) {
                            scope.selectedInterfaces[key] = true;
                        }

                        scope.updateData();
                    });


                    function getFormattedValues(obj) {
                        var result = [];

                        for (var key in obj) {
                            result.push({
                                x: key,
                                y: obj[key]
                            });
                        }
                        return result;
                    }

                    scope.updateData = function updateData() {

                        if (!scope.selected) {
                            scope.selected = scope.networkSpeeds.totals;
                        }

                        scope.data = [];

                        for (var intface in scope.selectedInterfaces) {
                            if (!scope.selectedInterfaces[intface]) continue;

                            scope.data.push({
                                    values: getFormattedValues(scope.selected.rx[intface].values),
                                    key: intface + ' Rx'
                                },
                                {
                                    values: getFormattedValues(scope.selected.tx[intface].values),
                                    key: intface + ' Tx'
                                }
                            );
                        }
                    };




                }
            };

        });
}());
