(function() {
    'use strict';

    describe('vampUi.views.workload module', function() {

        beforeEach(function() {
            //module('ngRoute');
            module('vampUi.views.workload');
        });

        var controller;
        var ExecutionHelperService;
        var Workload;
        var scope;


        beforeEach(module(function($provide) {
            Workload = {
                getAll: function() {}
            };
            $provide.value('Workload', Workload);
            ExecutionHelperService = {};
            $provide.value('ExecutionHelperService', ExecutionHelperService);
        }));


        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('WorkloadController', {
                $scope: scope,
                ExecutionHelperService: ExecutionHelperService,
                Workload: Workload
            });
        }));

        describe('WorkloadController', function(){

            it('expects WorkloadController to be defined', function() {
                expect(controller).toBeDefined();
            });

        });

        describe('WorkloadRoutes', function() {
            it('expects /workload routes to be configured correctly', function() {
                inject(function($route) {
                    expect($route.routes['/workload'].controller).toBe(
                        'WorkloadController'
                    );
                    expect($route.routes['/workload'].templateUrl).toEqual(
                        'views/workload/workload.html'
                    );
                });
            });
        });

    });
}());


