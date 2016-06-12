(function() {
    'use strict';

    describe('vampUi.views.execute module', function() {

        beforeEach(module('vampUi.views.execute'));

        var controller, scope, $route, $interval;

        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('ExecuteController', {
                $scope: scope,
                ExecutionHelperService: {
                    isFull: function() {},
                    createExecution: function() {}
                },
                ExecutionDataExtractService: {},
                $route: {
                    current: {
                        $$route: {
                            type: 'sample'
                        }
                    }
                },
                $interval: $interval,
                EXECUTION_SETTINGS: {
                    sample: {
                        type: 'sample'
                    }
                }
            });
        }));

        describe('ExecuteController', function(){
            it('expects ExecuteController to be defined', function() {
                expect(controller).toBeDefined();
            });

            it('should correctly add a line to progressText', function() {
                var oldLine = scope.progressText;
                scope.addProgressLine('test');

                expect(scope.progressText).toEqual(oldLine + '\r\ntest');
            });

        });

        describe('ExecuteRoutes', function() {
            it('expects /execute routes to be configured correctly', function() {
                inject(function($route) {
                    expect($route.routes['/execute'].controller).toBe(
                        'ExecuteController'
                    );
                    expect($route.routes['/execute'].templateUrl).toEqual(
                        'views/execute/execute.html'
                    );
                    expect($route.routes['/execute'].type).toEqual('full');
                });
            });
        });
    });
}());

