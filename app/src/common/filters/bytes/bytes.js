/**
 * Bytes Filter
 * @namespace Filters
 */

(function() {
    'use strict';

    angular
        .module('vampUi.filters.bytes', [])
        .filter('bytes', bytesFilter);

    /**
     * @namespace BytesFilter
     * @desc Filter that converts raw bytes to kB, MB, GB, TB or PB
     * @memberOf Filters
     */
    function bytesFilter() {
        /* Adopted from https://gist.github.com/thomseddon/3511330 */
        return function(bytes, precision) {
            if (bytes === 0 || isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '0';
            if (typeof precision === 'undefined') precision = 1;
            var units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'],
                number = Math.floor(Math.log(bytes) / Math.log(1024));
            return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) +  ' ' + units[number];
        };
    }
}());
