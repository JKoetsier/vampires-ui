(function() {
    'use strict';

    angular.module('myApp')
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
        });
}());

