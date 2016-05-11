'use strict';

angular.module('myApp')


    .directive('showTail', function () {
        return function (scope, elem, attr) {
            scope.$watch(function () {
                    return elem[0].value;
                },
                function (e) {
                    elem[0].scrollTop = elem[0].scrollHeight;
                });
        }

});