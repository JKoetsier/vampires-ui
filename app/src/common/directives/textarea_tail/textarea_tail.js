/**
 * TextareaTail Directive
 * @namespace Directives
 */

(function() {
    'use strict';

    angular
        .module('vampUi.directives.textareaTail', [])
        .directive('showTail', showTail);

    /**
     * @namespace TextareaTail
     * @desc Keeps the textarea scrolled to the last line.
     * @memberOf Directives
     */
    function showTail() {
        return function (scope, elem, attr) {
            scope.$watch(function () {
                    return elem[0].value;
                },
                function (e) {
                    elem[0].scrollTop = elem[0].scrollHeight;
                });
        };
    }
}());
