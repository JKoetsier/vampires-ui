/**
 * Sample View
 * @namespace View
 * @desc Redirects to the Execute view with 'sample' parameter type
 */

(function() {
    'use strict';

    angular
        .module('vampUi.views.sample', ['ngRoute'])
        .config(['$routeProvider', SampleRoutes]);

    /**
     * @namespace SampleRoutes
     * @desc Routes for the sample view
     * @memberOf Views
     */
    function SampleRoutes($routeProvider) {
        $routeProvider.when('/sample', {
            templateUrl: 'views/execute/execute.html',
            controller: 'ExecuteController',
            title: 'Running sampling',
            type: 'sample'
        });
    }
}());


