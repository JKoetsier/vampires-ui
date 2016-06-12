(function() {
    'use strict';

    describe('vampUi.views.sample module', function() {

        beforeEach(module('vampUi.views.sample'));

        describe('SampleRoutes', function() {
            it('expects route /sample to be configured correctly', function() {
                inject(function($route) {
                    expect($route.routes['/sample'].controller).toBe('ExecuteController');
                    expect($route.routes['/sample'].templateUrl).toEqual(
                        'views/execute/execute.html'
                    );
                    expect($route.routes['/sample'].type).toEqual('sample');
                });
            });
        });
    });
}());

