(function() {
    'use strict';

    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length-1].src;

    angular.module('myApp')


        .directive('histogramStats', function () {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: currentScriptPath.replace('histogram_stats.js', 'histogram_stats.html'),
                scope: true,
                link: function (scope, elem, attrs) {


                }
            };

        });
}());
