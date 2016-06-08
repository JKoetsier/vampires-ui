(function() {
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
            'Configuration', 'Resource',
            function($scope, ApiClientService, ExecutionHelperService, Configuration, Resource) {

                $scope.selected = {};
                $scope.providers = [];
                $scope.counts = {};

                $scope.executionType = 'sample';

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

                $scope.createConfiguration = function(cb) {


                    if ($scope.resourcesConfig.$invalid) {
                        return;
                    }

                    var resources = [];

                    for (var provider in $scope.selected) {
                        $scope.selected[provider].forEach(function(type) {
                            var count = $scope.counts[provider][type] || 1;

                            resources.push(new Resource({
                                provider: provider,
                                type: type,
                                count: count
                            }));

                        });
                    }

                    var conf = new Configuration();
                    conf.setDescription($scope.description);
                    conf.setResources(resources);
                    conf.save(function(conf) {
                        ExecutionHelperService.setConfiguration(conf);

                        cb();
                    });

                };

                $scope.run = function run() {
                    $scope.createConfiguration(function() {
                        if ($scope.executionType == 'full') {
                            ExecutionHelperService.setFull();
                        }

                        ExecutionHelperService.doNextStep();
                    });
                };

                ApiClientService.providers.getAll(function(providers) {

                    providers.forEach(function(data) {
                        $scope.providers.push(data);

                        for (var p in $scope.providers) {
                            $scope.counts[$scope.providers[p].provider] = {};

                            $scope.providers[p].resources.forEach(function(r) {
                                $scope.counts[$scope.providers[p].provider][r.type] = 1;
                            });
                        }

                    });
                });
            }]);
}());

