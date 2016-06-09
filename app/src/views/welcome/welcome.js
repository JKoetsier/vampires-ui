/**
 * Welcome View
 * @namespace Views
 */
(function() {
    'use strict';

    angular
        .module('vampUi.views.welcome', ['ngRoute'])
        .config(['$routeProvider', WelcomeRoutes])
        .controller('WelcomeController', WelcomeController);

    /**
     * @namespace WelcomeRoutes
     * @desc Controller for the welcome view
     * @memberOf Views
     */
    function WelcomeRoutes($routeProvider) {
        $routeProvider.when('/start', {
            templateUrl: 'views/welcome/welcome.html',
            controller: 'WelcomeController',
            title: 'Welcome!'
        });
    }

    /**
     * @namespace WelcomeController
     * @desc Controller for the welcome view
     * @memberOf Views
     */
    function WelcomeController() {

    }
})();

