'use strict'

angular.module('myApp.api_client', [])

    .factory('ApiClientService', ['$http', function($http) {
        var host = 'http://private-1de35d-vampires.apiary-mock.com';
        var calls = {};


        /*
         * API documentation can be found at http://docs.vampires.apiary.io/
         */
        calls.getProviders = function(cb) {

            $http.get(host + '/providers').then(
                function successCallback(response) {
                    cb(response);
                },
                function errorCallback(response) {

                }
            );
        };

        calls.getWorkloads = function() {

            $http.get(host + '/workloads').then(
                function successCallback(response) {

                },
                function errorCallback(response) {

                }
            )
        };

        calls.addWorkload = function(workload) {

            $http.post(host + '/workloads', workload).then(
                function successCallback(response) {

                },
                function errorCallback(response) {

                }
            )
        };

        calls.viewWorkloadStatus = function(id) {

            $http.get(host + '/workloads/' + id).then(
                function successCallback(response) {

                },
                function errorCallback(response) {

                }
            )
        };

        calls.changeWorkloadStatus = function(id) {

            $http.post(host + '/workloads/' + id).then(
                function successCallback(response) {

                },
                function errorCallback(response) {

                }
            )
        };

        return calls;

    }]);