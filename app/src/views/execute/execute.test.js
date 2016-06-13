(function() {
    'use strict';

    describe('vampUi.views.execute module', function() {

        beforeEach(module('vampUi.views.execute'));
        beforeEach(module('vampUi.services.executionHelper.mock'));
        beforeEach(module('vampUi.services.executionDataExtract.mock'));
        beforeEach(module('vampUi.config'));

        var $controller,
            $scope,
            $route,
            $intervalSpy,
            ExecutionHelperService,
            ExecutionDataExtractService,
            EXECUTION_SETTINGS;


        describe('ExecuteController', function(){
            beforeEach(inject(function(_$rootScope_, _$controller_, _$route_,
                                       _$interval_, ExecutionHelperServiceMock,
                                       ExecutionDataExtractServiceMock,
                                       _EXECUTION_SETTINGS_) {
                $route = _$route_;

                ExecutionDataExtractService = ExecutionDataExtractServiceMock;
                EXECUTION_SETTINGS = _EXECUTION_SETTINGS_;
                ExecutionHelperService = ExecutionHelperServiceMock;
                $scope = _$rootScope_.$new();

                $intervalSpy = jasmine.createSpy('$interval', _$interval_);

                $route.current = {
                    $$route: {
                        type: 'sample'
                    }
                };

                $controller = _$controller_('ExecuteController', {
                    $scope: $scope,
                    ExecutionHelperService: ExecutionHelperService,
                    ExecutionDataExtractService: ExecutionDataExtractService,
                    $route: $route,
                    $interval: $intervalSpy,
                    EXECUTION_SETTINGS: EXECUTION_SETTINGS
                });
            }));

            it('expects ExecuteController to be defined', function() {
                expect($controller).toBeDefined();
            });

            it('should correctly add a line to progressText', function() {
                var oldLine = $scope.progressText;
                $scope.addProgressLine('test');

                expect($scope.progressText).toEqual(oldLine + '\r\ntest');
            });

            it('should start executing once loaded', function() {
                spyOn($scope, 'startExecution');
                spyOn($scope, 'startPolling');

                /* Give time to load */
                setTimeout(function() {
                    expect($scope.startExecution).toHaveBeenCalled();
                    expect($scope.startPolling).toHaveBeenCalled();
                    expect($scope.executeion).toBeDefined();
                }, 2000);
            });

            it('should start full execution when EHS is set to full', function() {
                ExecutionHelperService.setFull();
                $scope.startExecution();

                expect($scope.type).toEqual('full');
            });

            it('should start sample execution when route param type is set to sample', function() {
                expect($scope.type).toEqual('sample');
            });


            it('should correctly stop executing', function() {
                $scope.stopExecution();
                var progressTextLength = $scope.progressText.length;
                spyOn($intervalSpy, 'cancel');


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

