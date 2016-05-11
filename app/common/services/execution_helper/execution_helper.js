'use strict';

angular.module('myApp.execution_helper', [])

    .factory('ExecutionHelperService', ['$window', '$route', '$location',
            function($window, $route, $location) {

        var configuration = {};
        var methods = {};

        var steps = [
            '/workload',
            '/resources',
            '/sample',
            '/results',
            '/execute'
        ];

        methods.setWorkloadId = function setWorkloadId(workload_id) {
            configuration.workload_id = workload_id;
        };

        methods.setConfigurationId = function setConfigurationId(configuration_id) {
            configuration.configuration_id = configuration_id;
        };

        methods.setExecutionId = function setExecutionId(execution_id) {
            configuration.execution_id = execution_id;
        };

        methods.doNextStep = function doNextStep() {
            var current = $location.path();
            var nextId = steps.indexOf(current) + 1;

            $location.path(steps[nextId]);
        };

        methods.getWorkloadId = function getWorkloadId() {
            return configuration.workload_id;
        };

        methods.getConfigurationId = function getConfigurationId() {
            return configuration.configuration_id;
        };

        return methods;

    }]);