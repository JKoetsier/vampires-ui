'use strict'

angular.module('myApp.api_client', [])

    .factory('ApiClientService', ['$http', 'API_URL', function($http, API_URL) {
        var host = API_URL;
        var calls = {};


        /*
         * API documentation can be found at http://docs.vampires.apiary.io/
         */
        calls.providers = {};
        calls.providers.getAll = function(cb) {

            $http.get(host + '/providers').then(
                function successCallback(response) {
                    cb(response.data);
                },
                function errorCallback(response) {

                }
            );
        };

        calls.workloads = {};
        calls.workloads.get = function(workload_id) {

            $http.get(host + '/workloads/' + workload_id).then(
                function successCallback(response) {

                },
                function errorCallback(response) {

                }
            );
        };

        calls.workloads.getAll = function(cb) {

            $http.get(host + '/workloads').then(
                function successCallback(response) {
                    cb(response.data);
                },
                function errorCallback(response) {

                }
            )
        };

        calls.workloads.add = function(workload, cb) {

            $http.post(host + '/workloads', workload).then(
                function successCallback(response) {
                    cb(response.data);
                },
                function errorCallback(response) {

                }
            )
        };

        calls.workloadStatus = {};
        calls.workloadStatus.get = function(id) {

            $http.get(host + '/workloads/' + id).then(
                function successCallback(response) {

                },
                function errorCallback(response) {

                }
            )
        };

        calls.workloadStatus.change = function(id) {

            $http.post(host + '/workloads/' + id).then(
                function successCallback(response) {

                },
                function errorCallback(response) {

                }
            )
        };

        calls.configurations = {};
        calls.configurations.create = function(configuration, cb) {
            $http.post(host + '/configurations', configuration).then(
                function successCallback(response) {
                    cb(response.data);
                },
                function errorCallback(response) {

                }
            )
        };

        calls.configurations.getAll = function(cb) {
            $http.get(host + '/configurations').then(
                function successCallback(response) {
                    cb(response.data);
                },
                function errorCallback(response) {

                }
            );
        };

        calls.configurations.getByWorkload = function(workload_id, cb) {
            $http.get(host + '/configurations/' + workload_id).then(
                function successCallback(response) {
                    cb(response.data);
                },
                function errorCallback(response) {

                }
            );
        };

        calls.executions = {};
        calls.executions.new = function(configuration_id, workload_id, type, cb) {
            var data = {
                configuration: configuration_id,
                workload: workload_id,
                type: type
            };

            $http.post(host + '/executions', data).then(
                function successCallback(response) {
                    cb(response.data);
                },
                function errorCallback(response) {

                }
            )
        };

        calls.executions.getStatus = function(execution_id, cb) {
            $http.get(host + '/executions/' + execution_id).then(
                function successCallback(response) {
                    cb(response.data);
                },
                function errorCallback(response) {

                }
            )
        };

        /* Valid actions are 'start', 'stop', 'kill' */
        calls.executions.changeStatus = function(execution_id, action, cb) {
            var data = {
                action: action
            };

            $http.post(host + '/executions/' + execution_id, data).then(
                function successCallback(response) {
                    cb(response.data);
                },
                function errorCallback(response) {

                }
            )
        };

        return calls;

    }]);