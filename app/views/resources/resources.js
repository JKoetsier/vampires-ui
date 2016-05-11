'use strict';

angular.module('myApp.resources', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/resources', {
            templateUrl: 'views/resources/resources.html',
            controller: 'ResourcesController',
            title: 'Select Resources'
        });
    }])

    .controller('ResourcesController', ['$scope', 'ApiClientService', 'ExecutionHelperService',
        function($scope, ApiClientService, ExecutionHelperService) {

            $scope.selected = {};
            $scope.providers = [];

            $scope.toggleSelected = function(provider, type) {

                if (!(provider in $scope.selected)) {
                    $scope.selected[provider] = [];
                }

                var i = $scope.selected[provider].indexOf(type);

                if (i == -1) {
                    $scope.selected[provider].push(type);
                }
                else {
                    delete $scope.selected[provider][i];
                }

                console.log($scope.selected);
            };

            $scope.isSelected = function(provider, type) {
                if (!(provider in $scope.selected)) {
                    return false;
                }

                if ($scope.selected[provider].indexOf(type) == -1) {
                    return false;
                }

                return true;
            };

            $scope.createConfiguration = function() {
                var configuration = {};

                if ($scope.resourcesConfig.$invalid) {
                    return;
                }

                configuration.resources = [];

                for (var provider in $scope.selected) {
                    $scope.selected[provider].forEach(function(type, index) {
                        configuration.resources.push({
                            provider: provider,
                            type: type,
                            count: 1
                        });
                    });

                }

                configuration.description = $scope.description;
                configuration.workload = ExecutionHelperService.getWorkloadId();

                ApiClientService.configurations.create(configuration, function(config) {
                    ExecutionHelperService.setConfigurationId(config.id);
                })
            };

            $scope.run = function run() {
                $scope.createConfiguration();

                ExecutionHelperService.doNextStep();

            };

            ApiClientService.providers.getAll(function(providers) {

                providers.forEach(function(data, i) {
                    $scope.providers.push(data);
                });
            });
        }]);

