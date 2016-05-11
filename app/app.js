'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'nvd3',
  'myApp.resources',
  'myApp.results',
  'myApp.execute',
  'myApp.start',
  'myApp.workload',
  'myApp.api_client',
  'myApp.execution_helper'
]).

config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/start'});
}])

.run(['$rootScope', '$route', function($rootScope, $route) {
  $rootScope.$on("$routeChangeSuccess", function(event, currentRoute, previousRoute){
    //Change page title, based on Route information

    if (angular.isUndefined($route.current.title)) {
      $rootScope.title = 'Vampires';
    } else {
      $rootScope.title = $route.current.title;
    }
  });
}]);
