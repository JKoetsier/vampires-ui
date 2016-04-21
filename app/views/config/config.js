'use strict';

angular.module('myApp.config', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/config', {
            templateUrl: 'views/config/config.html',
            controller: 'ConfigController',
            title: 'Configuration'
        });
    }])

    .controller('ConfigController', ['$scope', 'ApiClientService', function($scope, ApiClientService) {
        $scope.taskType = 'file';
        $scope.sequenceStart = 0;
        $scope.sequenceStop = 100;
        $scope.providers = [];
        $scope.selected = {};
        $scope.file = {};

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

        $scope.readContents = function readContents($contents) {
            $scope.file.contents = $contents;

            console.log($scope.file);
        };

        $scope.run = function run() {
            // check sequences
            // check description
            // check task type and if task supplied
            // do run
        };


        var test = '[ \
            { \
                "provider": "ec2", \
                "name" : "Amazon EC2", \
                "resources": [ \
                    { \
                        "type": "eu-west1.t2.nano", \
                        "cost": 10 \
                    }, { \
                        "type": "eu-west1.t2.micro", \
                        "cost": 100 \
                    }, { \
                        "type": "eu-west1.t3.micro", \
                        "cost": 110 \
                    } \
                ] \
            }, \
        \
            { \
                "provider": "DAS5", \
                "name" : "das5", \
                "resources": [ \
                    { \
                        "type": "uva.fat", \
                        "cost": 10 \
                    }, \
                    { \
                        "type": "uva.gpu", \
                        "cost": 100 \
                    }, \
                    { \
                        "type": "vu.fat", \
                        "cost": 110 \
                    } \
                ] \
            } \
]';
        test = JSON.parse(test);
        test.forEach(function(data, i) {
            $scope.providers.push(data);
        });

        //ApiClientService.getProviders(function(providers) {
        //    console.log(providers);
        //    $scope.providers = providers;
        //  providers.forEach(function(data, i) {
        //      $scope.providers.push(data);
        //});
    }])

    .directive('onReadFile', function ($parse) {
        return {
            restrict: 'A',
            scope: false,
            link: function(scope, element, attrs) {
                var fn = $parse(attrs.onReadFile);

                element.on('change', function(onChangeEvent) {
                    var reader = new FileReader();

                    reader.onload = function(onLoadEvent) {
                        scope.file.name = (onChangeEvent.srcElement || onChangeEvent.target).files[0].name;

                        scope.$apply(function() {
                            fn(scope, {$contents:onLoadEvent.target.result});
                        });
                    };

                    reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
                });
            }
        };
    });