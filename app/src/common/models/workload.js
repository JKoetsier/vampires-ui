(function() {
    'use strict';

    angular.module('myApp.models.workload', [])

        .factory('Workload', ['ApiClientService', function(ApiClientService) {

            /* Constructor */
            function Workload(id) {
                this.id = (typeof id === 'undefined') ? null : id;
                this.sequenceStart = null;
                this.sequenceStart = null;
                this.task = null;
                this.description = null;
                this.created_at = null;
                this.lastupdate_at = null;

                if (this.id) {
                    this.load();
                }
            }

            /* Static */
            Workload.getAll = function(cb) {
                ApiClientService.workloads.getAll(function(workloads) {
                    var result = [];

                    workloads.forEach(function(workload) {
                        result.push(Workload.fromJson(workload));
                    });
                    cb(result);

                });
            };

            Workload.get = function(id, cb) {
                ApiClientService.workloads.get(id, function(workload) {
                    cb(Workload.fromJson(workload));
                });
            };

            Workload.fromJson = function(jsonObj) {
                var workload = new Workload();

                workload.setFromJson(jsonObj);

                return workload;
            };

            /* Member */
            Workload.prototype.load = function() {
                ApiClientService.workloads.get(this.id, function(workload) {
                    this.setFromJson(workload);
                });
            };

            Workload.prototype.toJson = function() {
                var result = {};

                for (var property in this) {
                    if (this.hasOwnProperty(property)) {
                        result[property] = this[property];
                    }
                }

                return result;
            };

            Workload.prototype.setFromJson = function(jsonObj) {
                for (var property in jsonObj) {
                    if (jsonObj.hasOwnProperty(property)) {
                        this[property] = jsonObj[property];
                    }
                }
            };

            Workload.prototype.save = function(cb) {
                var wl = this;
                if (!this.id) {
                    ApiClientService.workloads.create(this.toJson(), function(workload) {
                        wl.id = workload.id;
                        cb();
                    });
                } else {
                    ApiClientService.workloads.update(this.description, this.id, function(workload) {
                        cb();
                    });
                }
            };


            return Workload;
        }]);

}());

