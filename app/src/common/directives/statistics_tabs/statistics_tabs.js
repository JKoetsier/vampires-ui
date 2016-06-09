/**
 * StatisticsTabs Directive
 * @namespace Directives
 */

(function() {
    'use strict';

    var scripts = document.getElementsByTagName('script');
    var currentScriptPath = scripts[scripts.length-1].src;

    angular
        .module('vampUi.directives.statisticsTabs', [])
        .directive('statisticsTabs', statisticsTabs);

    /**
     * @namespace StatisticsTabs
     * @desc Statistics tabs for statistics blocks such as graphs and tables
     * @memberOf Directives
     */
    function statisticsTabs() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: currentScriptPath.replace('statistics_tabs.js',
                'statistics_tabs.html'),
            scope: {
                root: '=',
                selectFunction: '&'
            },
            link: function (scope, elem, attrs) {

                scope.$watch('root', function() {
                    if (!scope.root || !('totals' in scope.root)) {
                        return;
                    }

                    scope.selected = scope.root.totals;
                    scope.showData(scope.selected);
                });

                scope.setTotals = function setTotals() {
                    scope.selectedProvider = null;
                    scope.selectedInstance = null;
                    scope.selectedClient = null;
                };

                scope.showData = function showData(data) {
                    scope.selected = data;
                    scope.selectFunction({data:data});
                };

                scope.setProvider = function setProvider(provider) {
                    scope.selectedProvider = provider;
                    scope.selectedInstance = null;
                    scope.selectedClient = null;
                };

                scope.setInstance = function setInstance(instance) {
                    scope.selectedInstance = instance;
                    scope.selectedClient = null;
                };

                scope.setClient = function setClient(client) {
                    scope.selectedClient = client;
                };

            }
        };
    }
}());
