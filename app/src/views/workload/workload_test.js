//describe('Unit: workloads', function() {
//    var ctrl, workload, executionHelperService;
//    var $scope = {};
//
//    beforeEach(module('myApp'));
//    beforeEach(module('myApp.workload'));
//    beforeEach(module('myApp.execution_helper'));
//
//    beforeEach(inject(function ($controller,
//        _ExecutionHelperService_, _Workload_) {
//
//        executionHelperService = _ExecutionHelperService_;
//        workload = _Workload_;
//
//        ctrl = $controller('WorkloadController', {
//            $scope: $scope,
//            ExecutionHelperService: executionHelperService,
//            Workload: workload
//        });
//
//    }));
//
//    describe('WorkloadController', function() {
//        it('should have taskType set to file', function() {
//            expect($scope.taskType).toEqual('file');
//        })
//    })
//})