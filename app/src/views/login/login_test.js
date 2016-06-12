(function() {
    'use strict';

    describe('vampUi.views.login module', function() {

        beforeEach(module('vampUi.views.login'));
        beforeEach(module('vampUi.services.auth.mock'));

        var $controller;
        var $scope;
        var $routeParams;
        var $location;
        var controller;
        var AuthService;

        beforeEach(inject(function(_$controller_, $rootScope, _$routeParams_, _$location_,
                AuthServiceMock) {
            $controller = _$controller_;
            $scope = $rootScope.$new();
            $routeParams = _$routeParams_;
            $location = _$location_;
            AuthService = AuthServiceMock;

            controller = $controller('LoginController', {
                $scope: $scope,
                $routeParams: $routeParams,
                AuthService: AuthService,
                $location: $location
            });
        }));

        describe('LoginRoutes', function() {
            inject(function($route) {
                it('expects /login routes to be configured correctly', function() {
                    inject(function($route) {
                        expect($route.routes['/login'].controller).toBe('LoginController');
                        expect($route.routes['/login'].templateUrl).toEqual(
                            'views/login/login.html'
                        );
                        expect($route.routes['/login/:redirect'].controller).toBe('LoginController');
                        expect($route.routes['/login/:redirect'].templateUrl).toEqual(
                            'views/login/login.html'
                        );
                    });
                });
            });

        });

        describe('LoginController', function() {

            it('expects LoginController to be defined', function() {
                expect(controller).toBeDefined();
            });

            it('should handle valid logins correctly and redirect to home', function() {
                spyOn($location, 'path');

                $scope.user = 'test';
                $scope.pass = 'test';

                $scope.login();

                expect($scope.error).toBe(null);
                expect($location.path).toHaveBeenCalledWith('/');
            });

            it('should handle valid logins correctly and redirect to optional route', function() {
                spyOn($location, 'path');

                $scope.user = 'test';
                $scope.pass = 'test';

                $routeParams.redirect = '/testurl';
                $scope.login();

                expect($scope.error).toBe(null);
                expect($location.path).toHaveBeenCalledWith('/testurl');
            });

            it('should handle invalid logins correctly. no redirect', function() {
                spyOn($location, 'path');

                $scope.user = 'test';
                $scope.pass = 'wrong_password';

                $scope.login();

                expect($scope.error).toBeDefined();
                expect($location.path).not.toHaveBeenCalled();
            });
        });
    });
}());

