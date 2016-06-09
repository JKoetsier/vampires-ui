/**
 * Executions View
 * @namespace Views
 */

(function() {
    'use strict';

    angular
        .module('vampUi.views.executions', ['ngRoute'])
        .config(['$routeProvider', ExecutionsRoutes])
        .controller('ExecutionsController', [
            '$scope',
            'Execution',
            ExecutionsController
        ]);


    /**
     * @namespace ExecutionsRoutes
     * @desc Routes for the executions view
     * @memberOf Views
     */
    function ExecutionsRoutes($routeProvider) {
        $routeProvider.when('/executions', {
            templateUrl: 'views/executions/executions.html',
            controller: 'ExecutionsController',
            title: 'Executions'
        });
    }

    /**
     * @namespace ExecutionsController
     * @desc Controller for the executions view
     * @memberOf Views
     */
    function ExecutionsController($scope, Execution) {

        $scope.getExecutions = function getExecutions() {
            Execution.getAll(function (executions) {
                $scope.executions = executions;

                console.log($scope.executions);
            });
        };

        $scope.getExecutions();

    }
}());

