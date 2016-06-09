/**
 * Configuration Model
 * @namespace Models
 */

(function() {
    'use strict';

    angular
        .module('vampUi.models.configuration', [])
        .factory('Configuration', [
            'ApiClientService',
            'Resource',
            ConfigurationFactory
        ]);


    /**
     * @namespace ConfigurationFactory
     * @desc Configuration model
     * @memberOf Models
     */
    function ConfigurationFactory(ApiClientService, Resource) {

        function Configuration(id) {
            this.id = (typeof id === 'undefined') ? null : id;
            this.description = null;
            this.resources = [];
            this.created_at = null;
            this.lastupdate_at = null;
            this.cost = null;

            if (this.id) {
                this.load();
            }
        }

        Configuration.getAll = function(cb) {
            ApiClientService.configurations.getAll(function(configurations) {
                var result = [];

                configurations.forEach(function(conf) {
                    result.push(Configuration.fromJson(conf));
                });

                cb(result);
            });
        };

        Configuration.get = function(id, cb) {
            ApiClientService.configurations.get(id, function(configuration) {
                cb(Configuration.fromJson(configuration));
            });
        };

        Configuration.fromJson = function(jsonObj) {
            var configuration = new Configuration();

            configuration.setFromJson(jsonObj);

            return configuration;
        };

        Configuration.prototype.setDescription = function(description) {
            this.description = description;
        };

        Configuration.prototype.setResources = function(resources) {
            this.resources = resources;
        };


        Configuration.prototype.load = function() {
            ApiClientService.configurations.get(this.id, function(conf) {
                this.setFromJson(conf);
            });
        };

        Configuration.prototype.toJson = function() {
            var result = {};

            for (var property in this) {
                if (this.hasOwnProperty(property)) {
                    result[property] = this[property];
                }
            }

            return result;
        };

        Configuration.prototype.setFromJson = function(jsonObj) {
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

        Configuration.prototype.save = function(cb) {
            if (!this.id) {
                var configuration = this;
                ApiClientService.configurations.create(this.toJson(), function(conf) {
                    configuration.setFromJson(conf);
                    cb(configuration);
                });
            }
        };

        return Configuration;
    }
}());

