(function() {
    'use strict';

    angular
        .module('vampUi.services.executionDataExtract.mock', [])
        .factory('ExecutionDataExtractServiceMock', ExecutionDataExtractServiceMock);


    function ExecutionDataExtractServiceMock() {

        var factory = {};

        var combinedCpuLoad = null;
        var cpuLoadPerCpu = null;
        var networkSpeeds = null;
        var networkCounters = null;
        var data = null;
        var cpuLoadArray = null;
        var networkSpeedsArray = null;
        var networkCountersArray = null;
        var costStatistics = null;

        const STAT_TYPE_TOTALS = 1;
        const STAT_TYPE_PROVIDER = 2;
        const STAT_TYPE_INSTANCE = 3;
        const STAT_TYPE_CLIENT = 4;

        var levelNames = {
            1: 'providers',
            2: 'instances',
            3: 'clients'
        };

        factory.setData = function setData(d) {
            data = d;
            combinedCpuLoad = null;
            cpuLoadPerCpu = null;
            networkSpeeds = null;
            networkCounters = null;
            cpuLoadArray = null;
            networkSpeedsArray = null;
            networkCountersArray = null;
            costStatistics = null;
        };

        /* Constructs an array with cpu loads in hierarchical order */
        var loadCpuLoadArray = function loadCpuLoadArray() {
            if (!data) throw "No data set";

            var n, loadType, label, splitted, statType, position, i, key;
            cpuLoadArray = {};


            for (var hist in data.stats.histograms) {
                if (!hist.startsWith('cpu-load-tick-'))
                    continue;

                splitted = hist.split(':');

                // Total, provider, instance or client
                statType = splitted.length;

                label = splitted[0].split('-');
                n = label[4];

                // user, system, idle, nice
                loadType = label[3];
                position = cpuLoadArray;

                for (i = 1; i < statType; i++) {
                    if (!(levelNames[i] in position)) {
                        position[levelNames[i]] = {};

                    }
                    position = position[levelNames[i]];

                    if (!(splitted[i] in position)) {
                        position[splitted[i]] = {};
                    }
                    position = position[splitted[i]];
                }

                if (!('totals' in position)) {
                    position.totals = {};
                }

                if (!(n in position.totals)) {
                    position.totals[n] = {};
                }
                position.totals[n][loadType] = data.stats.histograms[hist];


                /* Calculate percentages */
                if (Object.keys(position.totals[n]).length == 4) {
                    var total;

                    for (i = 0; i < position.totals[n].idle.count; i++) {
                        total = 0;
                        for (key in position.totals[n]) {
                            total += position.totals[n][key].values[i];
                        }

                        for (key in position.totals[n]) {
                            position.totals[n][key].values[i] = position.totals[n][key].values[i] / total * 100;
                        }
                    }
                }

            }
        };

        var loadNetworkSpeedArray = function loadNetworkSpeedArray() {
            if (!data) throw "No data set";

            var splitted, label, intface, statType, position, dataType;

            networkSpeedsArray = {};
            for (var hist in data.stats.histograms) {
                if (!hist.startsWith('network-'))
                    continue;

                splitted = hist.split(':');
                label = splitted[0].split('-');

                statType = splitted.length;
                dataType = label[1];

                intface = label[3];

                position = networkSpeedsArray;
                for (var i = 1; i < statType; i++) {
                    if (!(levelNames[i] in position)) {
                        position[levelNames[i]] = {};

                    }
                    position = position[levelNames[i]];

                    if (!(splitted[i] in position)) {
                        position[splitted[i]] = {};
                    }
                    position = position[splitted[i]];
                }

                if (!('totals' in position)) {
                    position.totals = {};
                }

                if (!(dataType in position.totals)) {
                    position.totals[dataType] = {};
                }
                position.totals[dataType][intface] = data.stats.histograms[hist];

            }
        };

        var loadNetworkCountersArray = function loadNetworkCountersARray() {
            if (!data) throw 'No data to work with';

            networkCountersArray = {};

            var splitted, label, position, statType, dataType, intface;

            for (var counter in data.stats.counters) {
                if (!counter.startsWith('network-rx-bytes-') && !counter.startsWith('network-tx-bytes-'))
                    continue;

                splitted = counter.split(':');
                label = splitted[0].split('-');

                statType = splitted.length;
                dataType = label[1];
                intface = label[3];

                position = networkCountersArray;
                for (var i = 1; i < statType; i++) {
                    if (!(levelNames[i] in position)) {
                        position[levelNames[i]] = {};

                    }
                    position = position[levelNames[i]];

                    if (!(splitted[i] in position)) {
                        position[splitted[i]] = {};
                    }
                    position = position[splitted[i]];
                }

                if (!('totals' in position)) {
                    position.totals = {};
                }

                if (!(intface in position.totals)) {
                    position.totals[intface] = {};
                }

                position.totals[intface][dataType] = data.stats.counters[counter].count;
            }
        };

        factory.getNetworkSpeeds = function getNetworkSpeeds(n) {
            if (networkSpeeds) return networkSpeeds;

            if (!networkSpeedsArray)
                loadNetworkSpeedArray();

            return networkSpeedsArray;
        };

        /* Returns structure with the average loads of all logical cpu
         * cores over the last n ticks. n defaults to 3
         */
        factory.getCurrentCpuLoads = function getCurrentCpuLoads(n) {
            if (combinedCpuLoad) return combinedCpuLoad;

            var total, totalTicks, loadType;
            var result = {};

            if (!cpuLoadArray) {
                loadCpuLoadArray();
            }

            n = n || 3;

            for (var core in cpuLoadArray) {
                var count = cpuLoadArray[core].totals.idle.count;
                count = count > n ? n : count;
                result[core] = {};
                totalTicks = 0;

                for (loadType in cpuLoadArray[core].totals) {
                    total = 0;
                    for (var i = count - 1; i >= 0; i--) {
                        total += cpuLoadArray[core].totals[loadType].values[i];
                    }
                    totalTicks += total;
                    result[core][loadType] = total;
                }

                for (loadType in result[core]) {
                    result[core][loadType] = result[core][loadType] / totalTicks * 100;
                }

            }
            combinedCpuLoad = result;

            return result;
        };

        factory.getCpuLoads = function getCpuLoads() {
            if (cpuLoadPerCpu) return cpuLoadPerCpu;

            if (!cpuLoadArray) {
                loadCpuLoadArray();
            }

            return cpuLoadArray;
        };

        factory.getNetworkCounters = function getNetworkCounters() {
            if (networkCounters) return networkCounters;

            if (!networkCountersArray) {
                loadNetworkCountersArray();
            }

            networkCounters = networkCountersArray;

            return networkCountersArray;
        };

        factory.getCostStatistics = function getCostStatistics() {
            if (costStatistics) return costStatistics;

            var splitted, statType, position, provider, instance, key;

            costStatistics = {};

            for (var hist in data.stats.histograms) {
                if (!hist.startsWith('duration'))
                    continue;

                splitted = hist.split(':');
                statType = splitted.length;

                if (statType != STAT_TYPE_INSTANCE) continue;


                provider = splitted[1];
                instance = splitted[2];
                key = provider + ':' + instance;

                if (!(key in costStatistics)) {
                    costStatistics[key] = {};
                }

                costStatistics[key].duration = data.stats.histograms[hist].mean;
            }

            for (var value in data.stats.values) {
                if (!value.startsWith('cost')) {
                    continue;
                }

                splitted = value.split(':');
                statType = splitted.length;

                if (statType != STAT_TYPE_INSTANCE) continue;

                provider = splitted[1];
                instance = splitted[2];
                key = provider + ':' + instance;

                if (!(key in costStatistics)) {
                    continue;
                }

                costStatistics[key].instance_cost = data.stats.values[value].value;
            }

            for (var conf in costStatistics) {
                costStatistics[conf].cost = (costStatistics[conf].duration /
                    (3600 * 1000)) * costStatistics[conf].instance_cost;
            }

            return costStatistics;
        };

        return factory;

    }
}());

