/**
 * Config
 * @namespace Config
 */
(function() {
    'use strict';

    angular
        .module('vampUi.config', [])
        .constant('API_URL', 'http://localhost:4567')
        .constant('EXECUTION_SETTINGS', {
            full: {
                type:               'full',
                pollingInterval:    5000
            },
            sample: {
                type:               'sample',
                pollingInterval:    2000
            }
        })
        .constant('GRAPH_MIN_CPU_USAGE', 0);
}());

