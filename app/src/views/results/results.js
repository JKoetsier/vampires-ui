(function() {
    'use strict';

    angular.module('myApp.results', ['ngRoute'])

        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/results/:id', {
                templateUrl: 'views/results/results.html',
                controller: 'ResultsController',
                title: 'Results'
            }).when('/results', {
                templateUrl: 'views/results/results.html',
                controller: 'ResultsController',
                title: 'Results'
            });
        }])

        .controller('ResultsController', ['$scope', 'ExecutionHelperService',
            'ApiClientService', 'Execution', '$routeParams', 'ExecutionDataExtractService', function($scope, ExecutionHelperService, ApiClientService, Execution, $routeParams, ExecutionDataExtractService) {
                $scope.results = [];

                $scope.sortReverse = false;
                $scope.sortBy = 'time';
                $scope.yTicks = [];
                $scope.xTicks = [];
                $scope.data = [];
                $scope.selected = null;


                $scope.mockData = function () {
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
                    var execution = null;

                    if ($routeParams.id) {
                        execution = new Execution();
                        execution.setId($routeParams.id);

                        execution.getStatus(function(status) {
                            ExecutionDataExtractService.setData(status.info);
                            ExecutionDataExtractService.getCombinedCpuLoad();
                        });
                    } else {
                        execution = ExecutionHelperService.getExecution();

                        /* For testing purposes only */
                        var id = 'efb37dc5-3216-4ae1-bbc7-7ea597a00a82';
                        if (!execution) {
                            var exec = new Execution();
                            exec.setId(id);

                            exec.getStatus(function (status) {
                                console.log(status);
                                $scope.results = status;

                                $scope.processData();
                            });
                        } else {
                            execution.getStatus(function (status) {
                                console.log(status);
                                $scope.results = status;

                                $scope.processData();
                            });
                        }
                    }
                };

                //$scope.createHistogramBins = function createHistogramBins(values) {
                //    var bins = {};
                //
                //    for (var i = 0; i < values.length; i++) {
                //
                //        bins[values[i]] = (bins[values[i]] || 0) + 1;
                //    }
                //
                //    return bins;
                //};
                //
                //$scope.createNvd3Values = function createNvd3Values(bins) {
                //    var values = [];
                //
                //    for (var bin in bins) {
                //        if (!bins.hasOwnProperty(bin)) continue;
                //        values.push({
                //            x: bin,
                //            y: bins[bin]
                //        });
                //    }
                //
                //    return values;
                //};

                //$scope.showStats = function showStats(data) {
                //    $scope.activeStats = $scope.resultData[data];
                //
                //    $scope.cpuLoads = [];
                //    var cpuLoads = {};
                //    var avgLoads = [];
                //
                //    for (var hist in $scope.activeStats.histograms) {
                //        if (!$scope.activeStats.histograms.hasOwnProperty(hist)) continue;
                //
                //        if (hist.startsWith('cpu-load-tick')) {
                //
                //            var label = hist.split('-');
                //            var n = label[label.length - 1];
                //
                //            if (!(n in cpuLoads)) {
                //                cpuLoads[n] = {};
                //            }
                //
                //            cpuLoads[n][label[label.length - 2]] = $scope.activeStats.histograms[hist];
                //
                //            delete $scope.activeStats.histograms[hist];
                //        }
                //
                //    }
                //
                //    console.log(cpuLoads);
                //
                //
                //    for (var n in cpuLoads) {
                //        var idleVals = [];
                //        var niceVals = [];
                //        var systemVals = [];
                //        var userVals = [];
                //
                //        for (var i = 0; i < cpuLoads[n].idle.count; i++) {
                //            var total = 0;
                //            total += cpuLoads[n].idle.values[i];
                //            total += cpuLoads[n].nice.values[i];
                //            total += cpuLoads[n].system.values[i];
                //            total += cpuLoads[n].user.values[i];
                //
                //            idleVals.push({
                //                x: i,
                //                y: cpuLoads[n].idle.values[i] / total * 100
                //            });
                //
                //            niceVals.push({
                //                x: i,
                //                y: cpuLoads[n].nice.values[i] / total * 100
                //            });
                //
                //            systemVals.push({
                //                x: i,
                //                y: cpuLoads[n].system.values[i] / total * 100
                //            });
                //
                //            userVals.push({
                //                x: i,
                //                y: cpuLoads[n].user.values[i] / total * 100
                //            });
                //
                //        }
                //        var key = 'cpu-load-' + n;
                //
                //        var data = [
                //
                //            {
                //                key: 'system',
                //                values: systemVals,
                //                color: 'red'
                //            },
                //            {
                //                key: 'user',
                //                values: userVals,
                //                color: 'orange'
                //            },
                //            {
                //                key: 'nice',
                //                values: niceVals,
                //                color: 'yellow'
                //            },
                //            {
                //                key: 'idle',
                //                values: idleVals,
                //                color: 'green'
                //            },
                //        ];
                //
                //        $scope.activeStats.histograms[key] = {};
                //        $scope.activeStats.histograms[key].data = data;
                //
                //
                //        var systemTotal = 0;
                //        var idleTotal = 0;
                //        var userTotal = 0;
                //        var niceTotal = 0;
                //
                //        for (var i = systemVals.length - 3; i < systemVals.length; i++) {
                //            if (i < 0) continue;
                //
                //            systemTotal += systemVals[i];
                //            idleTotal += idleVals[i];
                //            userTotal += userVals[i];
                //            niceTotal += niceVals[i];
                //        }
                //
                //
                //
                //
                //
                //    }
                //    $scope.activeStats.histograms['cpu-load-average'] = avgLoads;
                //    //
                //    //for (var load in cpuLoads) {
                //    //    var newLoad = {};
                //    //    newLoad.data = [];
                //    //
                //    //    for (var type in cpuLoads[load]) {
                //    //        var values = [];
                //    //
                //    //        for (var val in cpuLoads[load][type].values) {
                //    //            values.push({
                //    //                x: val,
                //    //                y: cpuLoads[load][type][val]
                //    //            })
                //    //        }
                //    //        newLoad.data.push({
                //    //            key: load,
                //    //            values: values
                //    //        });
                //    //    }
                //    //    console.log(newLoad);
                //    //    var key = 'cpu-load-' + load;
                //    //    $scope.activeStats.histograms[key] = newLoad;
                //    //}
                //
                //    console.log($scope.activeStats);
                //
                //
                //};

                //$scope.resultData = {
                //    totals: {},
                //    providerTypes: {},
                //    instanceTypes: {},
                //    clients: {}
                //};

                //$scope.processData = function processData() {
                //
                //    for (var statType in $scope.results.stats) {
                //        if (!$scope.results.stats.hasOwnProperty(statType)) continue;
                //
                //        for (var name in $scope.results.stats[statType]) {
                //            if (!$scope.results.stats[statType].hasOwnProperty(name)) continue;
                //
                //            var label = name.split(':');
                //
                //            /* TODO make generic loop */
                //            if (label.length == 1) {
                //                if (!(statType in $scope.resultData.totals)) {
                //                    $scope.resultData.totals[statType] = {};
                //                }
                //                $scope.resultData.totals[statType][label[0]] = $scope.results.stats[statType][name];
                //            } else if (label.length == 2) {
                //                if (!(label[1] in $scope.resultData.providerTypes)) {
                //                    $scope.resultData.providerTypes[label[1]] = {};
                //                }
                //                if (!(statType in $scope.resultData.providerTypes[label[1]])) {
                //                    $scope.resultData.providerTypes[label[1]][statType] = {};
                //                }
                //                $scope.resultData.providerTypes[label[1]][statType][label[0]] = $scope.results.stats[statType][name];
                //            } else if (label.length == 3) {
                //                if (!(label[1] in $scope.resultData.instanceTypes)) {
                //                    $scope.resultData.instanceTypes[label[1]] = {};
                //                }
                //                if (!(label[2] in $scope.resultData.instanceTypes[label[1]])) {
                //                    $scope.resultData.instanceTypes[label[1]][label[2]] = {};
                //                }
                //                if (!(statType in $scope.resultData.instanceTypes[label[1]][label[2]])) {
                //                    $scope.resultData.instanceTypes[label[1]][label[2]][statType] = {};
                //                }
                //                $scope.resultData.instanceTypes[label[1]][label[2]][statType][label[0]] = $scope.results.stats[statType][name];
                //            } else if (label.length == 4) {
                //                if (!(label[1] in $scope.resultData.clients)) {
                //                    $scope.resultData.clients[label[1]] = {};
                //                }
                //                if (!(label[2] in $scope.resultData.clients[label[1]])) {
                //                    $scope.resultData.clients[label[1]][label[2]] = {};
                //                }
                //                if (!(label[3] in $scope.resultData.clients[label[1]][label[2]])) {
                //                    $scope.resultData.clients[label[1]][label[2]][label[3]] = {};
                //                }
                //                if (!(statType in $scope.resultData.clients[label[1]][label[2]][label[3]])) {
                //                    $scope.resultData.clients[label[1]][label[2]][label[3]][statType] = {};
                //                }
                //                $scope.resultData.clients[label[1]][label[2]][label[3]][statType][label[0]] = $scope.results.stats[statType][name];
                //            }
                //        }
                //    }
                //
                //    console.log($scope.resultData);
                //};

                $scope.setSelected = function setSelected(result) {
                    $scope.data[0].values.forEach(function (val) {
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

                $scope.results.forEach(function (result) {
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
                for (var j = 0; j < maxX + 1; j++) {
                    $scope.xTicks.push(j);
                }

                $scope.xDomain = [0, maxX];
                $scope.yDomain = [0, maxY];

                $scope.histoOptions = {
                    chart: {
                        type: 'multiBarChart',
                        height: 450,
                        showControls: false,
                        stacked: true,
                        legend: {
                            updateState: false
                        }
                    }
                };


                $scope.options = {
                    chart: {
                        type: 'scatterChart',
                        height: 450,
                        color: d3.scale.category10().range(),
                        scatter: {
                            onlyCircles: false,
                            dispatch: {
                                elementClick: function (e) {
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
                            tickFormat: function (d) {
                                return d3.format('.02f')(d);
                            }
                        },
                        yAxis: {
                            axisLabel: 'Cost (USD)',
                            tickValues: $scope.yTicks,
                            tickFormat: function (d) {
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

                $scope.getResults();
            }]);
})();

