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

                            resources.push(new Resource({
                                provider: provider,
                                type: type,
                                count: 1
                            }));

                        });
                    }

                    var conf = new Configuration();
                    conf.setDescription($scope.description);
                    conf.setResources(resources);
                    conf.save(function(conf) {
                        ExecutionHelperService.setConfiguration(conf);

                        cb();
                        console.log(conf);
                    });

                };

                $scope.run = function run() {
                    $scope.createConfiguration(function() {
                        ExecutionHelperService.doNextStep();
                    });
                };

                ApiClientService.providers.getAll(function(providers) {

                    providers.forEach(function(data) {
                        $scope.providers.push(data);
                    });
                });
            }]);
}());

