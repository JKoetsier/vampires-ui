'use strict';

angular.module('myApp')
    .constant('API_URL', 'http://private-1de35d-vampires.apiary-mock.com')
    .constant('POLLING_INTERVAL_SAMPLING', 5000)
    .constant('POLLING_INTERVAL_FULL', 5000)
    .constant('EXECUTION_SETTINGS', {
        full: {
            type:               'full',
            pollingInterval:    5000
        },
        sampling: {
            type:               'sampling',
            pollingInterval:    2000
        }

    });