(function() {
    'use strict';

    describe('vampUi.views.welcome module', function() {

        beforeEach(module('vampUi.views.welcome'));

        var $controller;

        beforeEach(inject(function(_$controller_) {
            $controller = _$controller_;
        }));

        describe('WelcomeController', function(){
            it('expects WelcomeController to be defined', function() {
                var controller = $controller('WelcomeController');

                expect(controller).toBeDefined();
            });
        });

        describe('WelcomeRoutes', function() {
            it('expects route /start to be configured correctly', function() {
                inject(function($route) {
                    expect($route.routes['/start'].controller).toBe('WelcomeController');
                    expect($route.routes['/start'].templateUrl).toEqual(
                        'views/welcome/welcome.html'
                    );
                });
            });
        });
    });
}());

