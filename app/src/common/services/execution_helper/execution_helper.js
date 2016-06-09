/**
 * ExecutionHelper Service
 * @namespace Services
 */

(function() {
    'use strict';

    angular
        .module('vampUi.services.executionHelper', [])
        .factory('ExecutionHelperService', [
            '$location',
            'Workload',
            'Execution',
            ExecutionHelperService
        ]);

    /**
     * @namespace ExecutionHelperService
     * @desc Helper service that keeps the execution process state
     * @memberOf Services
     */
    function ExecutionHelperService($location, Workload, Execution) {

        var newExecution = {};
        var methods = {};

        var executions = [];
        var currentExecution = null;

        var steps = [
            'workload',
            'resources',
            'sample',
            'results',
            'execute'
        ];

        var dependencies = {
            'resources': ['workload'],
            'sample': ['workload', 'configuration']
        };

        var isFullExecution = false;

        methods.setWorkload = function setWorkload(workload) {
            newExecution.workload = workload;
        };

        methods.getWorkloads = function getWorkloads(cb) {
            Workload.getAll(function (workloads) {
                cb(workloads);
            });
        };

        methods.getConfigurations = function getConfigurations(cb) {
            Configuration.getAll(function (configurations) {
                cb(configurations);
            });
        };

        methods.setConfiguration = function setConfiguration(configuration) {
            newExecution.configuration = configuration;
        };

        methods.createExecution = function createExecution(type, cb) {

            var execution = new Execution(newExecution.workload,
                newExecution.configuration,
                type);

            execution.save(function (exec) {
                currentExecution = exec;
                executions.push(exec);

                cb(exec);

            });
        };

        methods.getExecution = function getExecution() {
            if (executions.length < 1) {
                return null;
            }
            return executions[0];
        };

        methods.doNextStep = function doNextStep() {
            var current = $location.path().split('/')[1];
            var nextId = steps.indexOf(current) + 1;

            var nextstep = steps[nextId];


            if (methods.hasAllDependencies(nextstep)) {
                $location.path('/' + nextstep);
            }

        };

        methods.hasAllDependencies = function hasAllDependencies(page) {
            var cont = true;

            if (dependencies[page]) {

                dependencies[page].forEach(function (dep) {
                    if (!newExecution[dep]) {
                        cont = false;
                    }
                });
            }

            return cont;
        };

        methods.isFull = function isFull() {
            return isFullExecution;
        };

        methods.setFull = function setFull() {
            isFullExecution = true;
        };

        return methods;

    }
}());

