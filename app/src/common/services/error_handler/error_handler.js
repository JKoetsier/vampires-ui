/**
 * ErrorHandler Service
 * @namespace Services
 */

(function() {
    'use strict';

    angular
        .module('vampUi.services.errorHandler', [])
        .factory('ErrorHandlerService', [
            ErrorHandlerService
        ]);

    /**
     * @namespace ErrorHandlerService
     * @desc Handles the global errors
     * @memberOf Services
     */
    function ErrorHandlerService() {

        var factory = {};
        var errors = [];

        factory.hasNewError = false;

        factory.hasErrors = function hasErrors() {
            return errors.length;
        };

        factory.getErrors = function getErrors() {
            var result = errors.splice(0, errors.length);
            errors = [];

            factory.hasNewError = false;

            return result;
        };

        factory.addError = function addError(error) {
            errors.push(error);
            factory.hasNewError = true;
        };

        return factory;
    }
}());

