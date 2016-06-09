/**
 * ApiClient Service
 * @namespace Services
 */

(function() {
    'use strict';

    angular
        .module('vampUi.services.apiClient', [])
        .factory('ApiClientService', [
            '$http',
            'API_URL',
            'AuthService',
            ApiClientService
        ]);


    /**
     * @namespace ApiClientService
     * @desc Handles the calls with the back-end
     * @memberOf Services
     */
    function ApiClientService($http, API_URL, AuthService) {
        var host = API_URL;
        var calls = {};

        var config = {
            headers: {
                'Authorization': 'Basic ' + AuthService.getBase64()
            }
        };

        function APIError(message, response) {
            this.name = 'APIError';
            this.message = (message || '');

            if (response) {
                this.message += ': ' + response.statusText + ' (' +
                    response.status + ')';
            }
        }

        /*
         * API documentation can be found at http://docs.vampires.apiary.io/
         */
        calls.providers = {};
        calls.providers.getAll = function (cb) {

            $http.get(host + '/providers', config).then(
                function successCallback(response) {
                    cb(response.data);
                },
                function errorCallback(response) {
                    throw new APIError('Failed to get providers', response);
                }
            );
        };

        calls.workloads = {};
        calls.workloads.get = function (workload_id, cb) {

            $http.get(host + '/workloads/' + workload_id, config).then(
                function successCallback(response) {
                    cb(response.data);
                },
                function errorCallback(response) {
                    throw new APIError('Could not retrieve workload', response);
                }
            );
        };

        calls.workloads.getAll = function (cb) {
            $http.get(host + '/workloads', config).then(
                function successCallback(response) {
                    cb(response.data);
                },
                function errorCallback(response) {
                    throw new APIError('Failed to fetch workloads', response);
                }
            );
        };

        calls.workloads.create = function (workload, cb) {

            $http.post(host + '/workloads', workload, config).then(
                function successCallback(response) {
                    cb(response.data);
                },
                function errorCallback(response) {
                    throw new APIError('Could not create workload', response);
                }
            );
        };

        calls.workloads.update = function (description, workload_id, cb) {
            var data = {
                description: description
            };

            $http.post(host + '/workloads/' + workload_id, data, config).then(
                function successCallback(response) {
                    cb(response.data);
                },
                function errorCallback(response) {
                    throw new APIError('Could not update workload', response);
                }
            );
        };

        calls.workloadStatus = {};
        calls.workloadStatus.get = function (id, cb) {

            $http.get(host + '/workloads/' + id, config).then(
                function successCallback(response) {
                    cb(response.data);
                },
                function errorCallback(response) {
                    throw new APIError('Could not get workload status', response);
                }
            );
        };

        calls.configurations = {};
        calls.configurations.create = function (configuration, cb) {
            $http.post(host + '/configurations', configuration, config).then(
                function successCallback(response) {
                    cb(response.data);
                },
                function errorCallback(response) {
                    throw new APIError('Could nog create configuration', response);
                }
            );
        };

        calls.configurations.get = function (configuration_id, cb) {
            $http.get(host + '/configurations/' + configuration_id, config).then(
                function successCallback(response) {
                    cb(response.data);
                },
                function errorCallback(response) {
                    throw new APIError('Could not get configuration', response);
                }
            );
        };

        calls.configurations.getAll = function (cb) {
            $http.get(host + '/configurations', config).then(
                function successCallback(response) {
                    cb(response.data);
                },
                function errorCallback(response) {
                    throw new APIError('Could not fetch configurations', response);
                }
            );
        };

        calls.configurations.getByWorkload = function (workload_id, cb) {
            $http.get(host + '/configurations/' + workload_id, config).then(
                function successCallback(response) {
                    cb(response.data);
                },
                function errorCallback(response) {
                    throw new APIError('Could not get configuration', response);
                }
            );
        };

        calls.configurations.delete = function (conf_id, cb) {
            $http.delete(host + '/configurations/' + conf_id, config).then(
                function successCallback(response) {
                    cb(response.data);
                },
                function errorCallback(response) {
                    throw new APIError('Could not delete configuration', response);
                }
            );
        };

        calls.executions = {};

        /* Possible types are 'full' or 'sample' */
        calls.executions.create = function (configuration_id, workload_id, type, cb) {
            var data = {
                configuration: configuration_id,
                workload: workload_id,
                type: type
            };

            $http.post(host + '/executions', data, config).then(
                function successCallback(response) {
                    cb(response.data);
                },
                function errorCallback(response) {
                    throw new APIError('Could not create execution', response);
                }
            );
        };

        calls.executions.getAll = function (cb) {
            $http.get(host + '/executions', config).then(
                function successCallback(response) {
                    cb(response.data);
                },
                function errorCallback(response) {
                    throw new APIError('Could not fetch executions list', response);
                }
            );
        };

        calls.executions.get = function (execution_id, cb) {
            $http.get(host + '/executions/' + execution_id, config).then(
                function successCallback(response) {
                    cb(response.data);
                },
                function errorCallback(response) {
                    throw new APIError('Could not get execution', response);
                }
            );
        };

        calls.executions.getStatus = function (execution_id, cb) {
            $http.get(host + '/executions/' + execution_id, config).then(
                function successCallback(response) {
                    cb(response.data);
                },
                function errorCallback(response) {
                    throw new APIError('Could not get execution status', response);
                }
            );
        };


        calls.executions.stop = function (execution_id, cb) {
            $http.delete(host + '/executions/' + execution_id, config).then(
                function successCallback(response) {
                    cb(response.data);
                },
                function errorCallback(response) {
                    throw new APIError('Could not delete execution', response);
                }
            );
        };

        return calls;

    }
}());

