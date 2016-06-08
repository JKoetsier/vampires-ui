(function() {
    'use strict';

    angular.module('myApp.models.execution', [])

        .factory('Execution', ['ApiClientService', 'Workload', 'Configuration', function(ApiClientService, Workload, Configuration) {

            function Execution(workload, configuration, type) {
                this.configuration = configuration;
                this.workload = workload;
                this.type = type;
                this.status = null;
            }

            Execution.getAll = function(cb) {
                ApiClientService.executions.getAll(function(executions) {
                    var result = [];

                    executions.forEach(function(exec) {
                        result.push(Execution.fromJson(exec));
                    });

                    cb(result);
                });
            };

            Execution.get = function(id, cb) {
                ApiClientService.executions.get(id, function(execution) {
                    cb(Execution.fromJson(execution));
                });
            };

            Execution.fromJson = function(jsonObj) {
                var execution = new Execution();

                execution.setFromJson(jsonObj);

                return execution;
            };

            Execution.prototype.getConfiguration = function(cb) {
                Configuration.get(this.configuration.id, function(configuration) {
                    cb(configuration);
                });
            };

            Execution.prototype.getWorkload = function(cb) {
                Workload.get(this.workload.id, function(workload) {
                    cb(workload);
                });
            };

            Execution.prototype.start = function(cb) {
                ApiClientService.executions.changeStatus(this.id, 'start',
                    function(data) {

                        cb(data);
                    });
            };


            Execution.prototype.stop = function(cb) {
                console.log('stopping');
                ApiClientService.executions.stop(this.id,
                    function(data) {
                        cb(data);
                    });
            };

            Execution.prototype.setConfiguration = function(configuration) {
                this.configuration = configuration;
            };

            Execution.prototype.setWorkload = function(workload) {
                this.workload = workload;
            };

            Execution.prototype.setType = function(type) {
                this.type = type;
            };

            Execution.prototype.setId = function(id) {
                this.id = id;
            };

            Execution.prototype.getStatus = function(cb) {
                ApiClientService.executions.getStatus(this.id, function(status) {
                    cb(status);
                });
            };

            Execution.prototype.setStatus = function(action, cb) {
                var execution = this;

                ApiClientService.executions.changeStatus(this.id, action, function(res) {
                    execution._last_update_at = res._last_update_at;
                    execution.status = res.status;
                    cb(execution);
                });
            };


            Execution.prototype.load = function() {
                ApiClientService.executions.get(this.id, function(conf) {
                    this.setFromJson(conf);
                });
            };

            Execution.prototype.toJson = function() {
                var result = {};

                for (var property in this) {
                    if (this.hasOwnProperty(property)) {
                        result[property] = this[property];
                    }
                }

                return result;
            };

            Execution.prototype.setFromJson = function(jsonObj) {
                for (var property in jsonObj) {
                    if (jsonObj.hasOwnProperty(property)) {

                        if (property == 'resources') {
                            var conf = this;

                            jsonObj[property].forEach(function(resource) {
                                conf.resources.push(new Resource(resource));
                            });
                        }
                        this[property] = jsonObj[property];
                    }
                }
            };

            Execution.prototype.save = function(cb) {
                if (!this.id) {
                    var execution = this;


                    ApiClientService.executions.create(this.configuration.id,
                                                       this.workload.id,
                                                       this.type, function(exec) {
                        execution.id = exec.id;
                        execution.status = exec.status;

                        cb(execution);
                    });
                }
            };

            return Execution;
        }]);
}());

