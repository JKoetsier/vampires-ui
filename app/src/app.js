(function() {
    'use strict';

    angular
        .module('vampUi', [
            'ngRoute',
            'nvd3',
            'vampUi.services.auth',
            'vampUi.services.apiClient',
            'vampUi.services.executionDataExtract',
            'vampUi.services.executionHelper',
            'vampUi.services.errorHandler',
            'vampUi.models.configuration',
            'vampUi.models.execution',
            'vampUi.models.resource',
            'vampUi.models.workload',
            'vampUi.directives.graphs.cpuUsageHistogram',
            'vampUi.directives.graphs.networkSpeedsHistogram',
            'vampUi.directives.graphs.histogramStats',
            'vampUi.directives.statisticsTabs',
            'vampUi.directives.tables.networkCounters',
            'vampUi.directives.textareaTail',
            'vampUi.filters.bytes',
            'vampUi.views.execute',
            'vampUi.views.executions',
            'vampUi.views.login',
            'vampUi.views.resources',
            'vampUi.views.results',
            'vampUi.views.sample',
            'vampUi.views.welcome',
            'vampUi.views.workload',
            'vampUi.config',
        ])

        .config(['$routeProvider', defaultRoute])

        .run([
            '$rootScope',
            '$route',
            'AuthService',
            'ExecutionHelperService',
            '$location',
            runFunction
        ])

        .controller('ErrorController', [
            '$scope',
            'ErrorHandlerService',
            '$timeout',
            ErrorController
        ])

        .factory('$exceptionHandler', [
            'ErrorHandlerService',
            ExceptionHandler
        ]);


    function defaultRoute($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/start'});
    }

    function runFunction ($rootScope, $route, AuthService, ExecutionHelperService, $location) {
        $rootScope.$on('$routeChangeStart', function (event, curRoute,
                                                      prevRoute) {


            /* Check if have dependencies. If not, prevent route change. If direct link,
             * redirect to welcome screen
             */
            if (!ExecutionHelperService.hasAllDependencies($location.path().replace('/', ''))) {
                if (!prevRoute) {
                    $location.path('/');
                } else {
                    event.preventDefault();
                }

            }

            if (!AuthService.isLoggedIn() &&
                !$location.path().startsWith('/login')) {

                $location.path('/login' + $location.path());
            }
        });
        $rootScope.$on('$routeChangeSuccess', function (event, currentRoute,
                                                        previousRoute) {

            if (angular.isUndefined($route.current.title)) {
                $rootScope.title = 'Vampires';
            } else {
                $rootScope.title = $route.current.title;
            }
        });
    }

    function ExceptionHandler(ErrorHandlerService) {
        return function handler(exception, cause) {
            ErrorHandlerService.addError(exception);
        };
    }

    function ErrorController($scope, ErrorHandlerService, $timeout) {

        $scope.$watch(function() {
            return ErrorHandlerService.hasNewError;
        }, function(newValue, oldValue) {
            if (newValue) {
                $scope.errors = ErrorHandlerService.getErrors();
            }

        });

        $scope.dismiss = function dismiss(index) {
            $scope.errors.splice(index, 1);
        };

    }
}());