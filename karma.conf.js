module.exports = function(config){
  config.set({

    basePath : './',

    files : [
        'app/src/bower_components/html5-boilerplate/dist/js/vendor/modernizr-2.8.3.min.js',
        'app/src/bower_components/angular/angular.min.js',
        'app/src/bower_components/angular-route/angular-route.min.js',
        'app/src/bower_components/angular-mocks/angular-mocks.js',
        'app/src/bower_components/jquery/dist/jquery.min.js',
        'app/src/bower_components/bootstrap/dist/js/bootstrap.min.js',
        'app/src/bower_components/d3/d3.min.js',
        'app/src/bower_components/nvd3/build/nv.d3.min.js',
        'app/src/bower_components/angular-nvd3/dist/angular-nvd3.min.js',
        'app/src/app.js',
        'app/src/common/directives/progress_bar/progress_bar.js',
        'app/src/common/directives/textarea_tail/textarea_tail.js',
        'app/src/common/models/configuration.js',
        'app/src/common/models/resource.js',
        'app/src/common/models/workload.js',
        'app/src/common/models/execution.js',
        'app/src/common/services/api_client/api_client.js',
        'app/src/common/services/execution_helper/execution_helper.js',
        'app/src/config.js',
        'app/src/views/execute/execute.js',
        'app/src/views/execute/execute_test.js',
        'app/src/views/resources/resources.js',
        'app/src/views/resources/resources_test.js',
        'app/src/views/results/results.js',
        'app/src/views/results/results_test.js',
        'app/src/views/sample/sample.js',
        'app/src/views/sample/sample_test.js',
        'app/src/views/start/start.js',
        'app/src/views/start/start_test.js',
        'app/src/views/workload/workload.js',
        'app/src/views/workload/workload_test.js',
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
