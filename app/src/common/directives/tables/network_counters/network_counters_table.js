(function() {
    'use strict';

    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length-1].src;

    angular.module('myApp')


        .directive('networkCountersTable', [function () {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: currentScriptPath.replace('network_counters_table.js', 'network_counters_table.html'),
                scope: {
                    counters: '='
                },
                link: function (scope, elem, attrs) {

                    scope.showData = function showData(data) {
                        scope.selected = data.data;
                    };
                }
            };

        }])

        /* https://gist.github.com/thomseddon/3511330 */
        .filter('bytes', function() {
            return function(bytes, precision) {
                if (bytes === 0 || isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '0';
                if (typeof precision === 'undefined') precision = 1;
                var units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'],
                    number = Math.floor(Math.log(bytes) / Math.log(1024));
                return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) +  ' ' + units[number];
            };
        });
}());
