/**
 * HistogramStats Directive
 * @namespace Directives
 */

(function() {
    'use strict';

    var scripts = document.getElementsByTagName('script');
    var currentScriptPath = scripts[scripts.length-1].src;

    angular
        .module('vampUi.directives.graphs.histogramStats', [])
        .directive('histogramStats', histogramStats);

    /**
     * @namespace HistogramStats
     * @desc Statistics table for histograms
     * @memberOf Directives
     */
    function histogramStats() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: currentScriptPath.replace('histogram_stats.js',
                'histogram_stats.html'),
            scope: true,
            link: function (scope, elem, attrs) {


            }
        };
    }
}());
