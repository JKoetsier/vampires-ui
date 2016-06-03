(function() {
    'use strict';

    angular.module('myApp.execution_helper', [])

        .factory('ExecutionHelperService', ['$window', '$route', '$location',
            'ApiClientService', 'Workload', 'Execution',
            function($window, $route, $location, ApiClientService, Workload, Execution) {

                var newExecution = {};
                var methods = {};

                var executions = [];
                var currentExecution = null;

                var steps = [
                    '/workload',
                    '/resources',
                    '/sample',
                    '/results',
                    '/execute'
                ];

                var dependencies = {
                    '/resources': [ 'workload' ],
                    '/sample': [ 'workload', 'configuration']
                };

                methods.setWorkload = function setWorkload(workload) {
                    newExecution.workload = workload;
                };

                methods.getWorkloads = function getWorkloads(cb) {
                    Workload.getAll(function(workloads) {
                        cb(workloads);
                    });
                };

                methods.getConfigurations = function getConfigurations(cb) {
                    Configuration.getAll(function(configurations) {
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

                    execution.save(function(exec) {
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
                    var current = $location.path();
                    var nextId = steps.indexOf(current) + 1;

                    var nextstep = steps[nextId];

                    var cont = true;


                    if (dependencies[nextstep]) {
                        console.log('have dependencies');

                        dependencies[nextstep].forEach(function(dep) {
                            if (!newExecution[dep]) {
                                cont = false;
                            }
                        });
                    }

                    if (cont) {
                        $location.path(steps[nextId]);
                    }

                };

                return methods;

            }]);
}());

