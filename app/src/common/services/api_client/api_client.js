(function() {
    'use strict';

    angular.module('myApp.api_client', [])

        .factory('ApiClientService', ['$http', 'API_URL', 'Auth', function($http, API_URL, Auth) {
            var host = API_URL;
            var calls = {};

            var config = {
                headers: {
                    'Authorization': 'Basic ' + Auth.getBase64()
                }
            };

            /*
             * API documentation can be found at http://docs.vampires.apiary.io/
             */
            calls.providers = {};
            calls.providers.getAll = function(cb) {

                $http.get(host + '/providers', config).then(
                    function successCallback(response) {
                        cb(response.data);
                    },
                    function errorCallback(response) {

                    }
                );
            };

            calls.workloads = {};
            calls.workloads.get = function(workload_id, cb) {

                $http.get(host + '/workloads/' + workload_id, config).then(
                    function successCallback(response) {
                        cb(response.data);
                    },
                    function errorCallback(response) {

                    }
                );
            };

            calls.workloads.getAll = function(cb) {
                console.log('Get all workloads');
                $http.get(host + '/workloads', config).then(
                    function successCallback(response) {
                        cb(response.data);
                        console.log(response);
                    },
                    function errorCallback(response) {
                        console.log(response);
                        cb(null);
                    }
                );
            };

            calls.workloads.create = function(workload, cb) {

                $http.post(host + '/workloads', workload, config).then(
                    function successCallback(response) {
                        cb(response.data);
                    },
                    function errorCallback(response) {

                    }
                );
            };

            calls.workloads.update = function(description, workload_id, cb) {
                var data = {
                    description: description
                };

                $http.post(host + '/workloads/' + workload_id, data, config).then(
                    function successCallback(response) {
                        cb(response.data);
                    },
                    function errorCallback(response) {

                    }
                );
            };

            calls.workloadStatus = {};
            calls.workloadStatus.get = function(id, cb) {

                $http.get(host + '/workloads/' + id, config).then(
                    function successCallback(response) {
                        cb(response.data);
                    },
                    function errorCallback(response) {

                    }
                );
            };

            calls.workloadStatus.change = function(id) {

                $http.post(host + '/workloads/' + id, config).then(
                    function successCallback(response) {

                    },
                    function errorCallback(response) {

                    }
                );
            };

            calls.configurations = {};
            calls.configurations.create = function(configuration, cb) {
                $http.post(host + '/configurations', configuration, config).then(
                    function successCallback(response) {
                        cb(response.data);
                    },
                    function errorCallback(response) {

                    }
                );
            };

            calls.configurations.get = function(configuration_id, cb) {
                $http.get(host + '/configurations/' + configuration_id, config).then(
                    function successCallback(response) {
                        cb(response.data);
                    },
                    function errorCallback(response) {

                    }
                );
            };

            calls.configurations.getAll = function(cb) {
                $http.get(host + '/configurations', config).then(
                    function successCallback(response) {
                        cb(response.data);
                    },
                    function errorCallback(response) {

                    }
                );
            };

            calls.configurations.getByWorkload = function(workload_id, cb) {
                $http.get(host + '/configurations/' + workload_id, config).then(
                    function successCallback(response) {
                        cb(response.data);
                    },
                    function errorCallback(response) {

                    }
                );
            };

            calls.configurations.delete = function(conf_id, cb) {
                $http.delete(host + '/configurations/' + conf_id, config).then(
                    function successCallback(response) {
                        cb(response.data);
                    },
                    function errorCallback(response) {

                    }
                );
            };

            calls.executions = {};

            /* Possible types are 'full' or 'sample' */
            calls.executions.create = function(configuration_id, workload_id, type, cb) {
                var data = {
                    configuration: configuration_id,
                    workload: workload_id,
                    type: type
                };

                console.log(data);

                $http.post(host + '/executions', data, config).then(
                    function successCallback(response) {
                        cb(response.data);
                    },
                    function errorCallback(response) {

                    }
                );
            };

            calls.executions.getAll = function(cb) {
                $http.get(host + '/executions', config).then(
                    function successCallback(response) {
                        cb(response.data);
                    }
                );
            };

            calls.executions.getStatus = function(execution_id, cb) {
                $http.get(host + '/executions/' + execution_id, config).then(
                    function successCallback(response) {
                        cb(response.data);
                    },
                    function errorCallback(response) {

                    }
                );
            };

            /* Valid actions are 'start', 'stop', 'kill' */
            calls.executions.changeStatus = function(execution_id, action, cb) {
                var data = {
                    action: action
                };

                $http.post(host + '/executions/' + execution_id, data, config).then(
                    function successCallback(response) {
                        cb(response.data);
                    },
                    function errorCallback(response) {

                    }
                );
            };

            return calls;

        }]);
}());

