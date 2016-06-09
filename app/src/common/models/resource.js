/**
 * Resource Model
 * @namespace Models
 */

(function() {
    'use strict';

    angular
        .module('vampUi.models.resource', [])
        .factory('Resource', [
            'ApiClientService',
            ResourceFactory
        ]);


    /**
     * @namespace ResourceFactory
     * @desc Resource model
     * @memberOf Models
     */
    function ResourceFactory(ApiClientService) {

        function Resource(data) {
            this.provider = data.provider;
            this.type = data.type;
            this.count = data.count;

        }

        Resource.prototype.load = function() {
            ApiClientService.configurations.get(this.id, function(conf) {

            });
        };

        Resource.prototype.toJson = function() {
            var result = {};

            for (var property in this) {
                if (this.hasOwnProperty(property)) {
                    result[property] = this[property];
                }
            }

            return result;
        };

        Resource.prototype.setFromJson = function(jsonObj) {
            for (var property in jsonObj) {
                if (jsonObj.hasOwnProperty(property)) {
                    this[property] = jsonObj[property];
                }
            }
        };

        Resource.prototype.save = function(cb) {

        };

        return Resource;
    }
}());

