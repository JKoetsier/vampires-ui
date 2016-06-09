var imports = {};

imports.js = {};

/* Declare JavaScript to be imported here. These will be imported in index.html */
imports.js.bower = [
    'app/src/bower_components/html5-boilerplate/dist/js/vendor/modernizr-2.8.3.min.js',
    'app/src/bower_components/angular/angular.min.js',
    'app/src/bower_components/angular-route/angular-route.min.js',
    'app/src/bower_components/jquery/dist/jquery.min.js',
    'app/src/bower_components/bootstrap/dist/js/bootstrap.min.js',
    'app/src/bower_components/d3/d3.min.js',
    'app/src/bower_components/nvd3/build/nv.d3.min.js',
    'app/src/bower_components/angular-nvd3/dist/angular-nvd3.min.js',
];

imports.js.app = [
    'app/src/app.js',
    'app/src/common/directives/graphs/network_speeds/network_speed_graph.js',
    'app/src/common/directives/graphs/cpu_usage/cpu_usage_graph.js',
    'app/src/common/directives/tables/network_counters/network_counters_table.js',
    'app/src/common/directives/graphs/cpu_usage_histogram/cpu_usage_histogram.js',
    'app/src/common/directives/textarea_tail/textarea_tail.js',
    'app/src/common/directives/statistics_tabs/statistics_tabs.js',
    'app/src/common/directives/graphs/network_speeds_histogram/network_speeds_histogram.js',
    'app/src/common/directives/graphs/histogram_stats/histogram_stats.js',
    'app/src/common/filters/bytes/bytes.js',
    'app/src/common/models/configuration.js',
    'app/src/common/models/resource.js',
    'app/src/common/models/workload.js',
    'app/src/common/models/execution.js',
    'app/src/common/services/api_client/api_client.js',
    'app/src/common/services/execution_helper/execution_helper.js',
    'app/src/common/services/auth/auth.js',
    'app/src/common/services/execution_data_extract/execution_data_extract.js',
    'app/src/common/services/error_handler/error_handler.js',
    'app/src/config.js',
    'app/src/views/execute/execute.js',
    'app/src/views/execute/execute_test.js',
    'app/src/views/resources/resources.js',
    'app/src/views/resources/resources_test.js',
    'app/src/views/results/results.js',
    'app/src/views/results/results_test.js',
    'app/src/views/sample/sample.js',
    'app/src/views/sample/sample_test.js',
    'app/src/views/welcome/welcome.js',
    'app/src/views/welcome/welcome_test.js',
    'app/src/views/workload/workload.js',
    'app/src/views/workload/workload_test.js',
    'app/src/views/executions/executions.js',
    'app/src/views/executions/executions_test.js',
    'app/src/views/login/login.js'
];

imports.css = {};

/* Declare CSS to be imported here. These will be imported in index.html */
imports.css.less = [
    'app/src/less/app.less'
];

imports.css.app = [
    'app/src/less/app.css'
];

imports.css.bower = [
    'app/src/bower_components/html5-boilerplate/dist/css/normalize.css',
    'app/src/bower_components/html5-boilerplate/dist/css/main.css',
    'app/src/bower_components/bootstrap/dist/css/bootstrap.min.css',
    'app/src/bower_components/bootstrap/dist/css/bootstrap-theme.min.css',
    'app/src/bower_components/components-font-awesome/css/font-awesome.min.css',
    'app/src/bower_components/nvd3/build/nv.d3.min.css'
];

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Copy all html files from src to dist
        copy: {
            build: {
                files: [{
                    cwd: 'app/src/',
                    src: [
                        '**/*.html',
                        '!dev_index.html',
                        '!index.html',
                        '!bower_components/**'
                    ],
                    dest: 'app/dist',
                    expand: true
                }, {
                    cwd: 'app/bower_components/components-font-awesome/fonts/',
                    src: ['**'],
                    dest: 'app/dist/fonts',
                    expand: true

                }]
            }

        },
        jshint: {
            options: {
                reporter: require('jshint-stylish'),
                globals: {
                    angular: false,
                    console: false,
                    d3     : false,
                },
                loopfunc: true,
                esversion: 6
            },

            // when this task is run, lint the Gruntfile and all js files in src
            build: [
                'Gruntfile.js',
                'app/src/**/*.js',
                '!app/src/bower_components/**'
            ]
        },
        uglify: {
            build: {
                files: {
                    '.tmp/js/app_only.min.js': imports.js.app,
                    '.tmp/js/bower_components.min.js': imports.js.bower
                }
            }
        },
        cssmin: {
            build: {
                files: {
                    '.tmp/styles/app.min.css': imports.css.app ,
                    '.tmp/styles/bower.min.css': imports.css.bower
                }
            }

        },
        concat: {
            build: {
                files: {
                    'app/dist/js/app.js': [
                        '.tmp/js/bower_components.min.js',
                        '.tmp/js/app_only.min.js'
                    ],
                    'app/dist/css/styles.css': [
                        '.tmp/styles/bower.min.css',
                        '.tmp/styles/app.min.css'
                    ]
                }
            }
        },
        less: {
            build: {
                files: {
                    'app/src/less/app.css': 'app/src/less/app.less'
                }
            },
            dev: {
                files: {
                    'app/src/less/app.css': 'app/src/less/app.less'
                }
            }
        },
        watch: {
            dev: {
                files: ['app/src/less/app.less'],
                tasks: ['less:dev']
            }
        },
        htmlbuild: {
            build: {
                src: 'app/src/index.html',
                dest: 'app/dist/index.html',
                options: {
                    styles: {
                        all: [
                            'css/styles.css'
                        ],
                        bower: [],
                        app: []
                    },
                    scripts: {
                        all: [
                            'js/app.js'
                        ],
                        bower: [],
                        app: []
                    }
                }
            },
            dev: {
                src: 'app/src/index.html',
                dest: 'app/src/dev_index.html',
                options: {
                    styles: {
                        bower: imports.css.bower,
                        app: imports.css.app,
                        all: []
                    },
                    scripts: {
                        bower: imports.js.bower,
                        app: imports.js.app,
                        all: []
                    }
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 8080,
                    hostname: '*',
                    base: {
                        path: 'app/src',
                        options: {
                            index: 'dev_index.html'
                        }
                    }
                }
            }
        },
        clean: ['.tmp/']
    }
    );

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-html-build');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('build', [
        'jshint',
        'copy',
        'less',
        'uglify',
        'cssmin',
        'concat',
        'htmlbuild:build',
        'clean'
    ]);

    grunt.registerTask('run', [
        'jshint',
        'htmlbuild:dev',
        'connect',
        'watch:dev'
    ]);
};