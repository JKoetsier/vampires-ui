(function() {
  'use strict';

  angular
      .module('myApp', [
        'ngRoute',
        'nvd3',
        'myApp.resources',
        'myApp.results',
        'myApp.execute',
        'myApp.start',
        'myApp.sample',
        'myApp.workload',
        'myApp.api_client',
        'myApp.auth',
        'myApp.login',
        'myApp.execution_helper',
        'myApp.executions',
        'myApp.execution_data',
        'myApp.models.workload',
        'myApp.models.configuration',
        'myApp.models.resource',
        'myApp.models.execution'
      ])

      .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/start'});
      }])

      .run(['$rootScope', '$route', 'AuthService', '$location', function($rootScope, $route, Auth, $location) {
        $rootScope.$on('$routeChangeStart', function(event, curRoute, prevRoute) {
          if (!Auth.isLoggedIn() && !$location.path().startsWith('/login')) {
            $location.path('/login' + $location.path());
          }
        });
        $rootScope.$on("$routeChangeSuccess", function(event, currentRoute, previousRoute){

          if (angular.isUndefined($route.current.title)) {
            $rootScope.title = 'Vampires';
          } else {
            $rootScope.title = $route.current.title;
          }
        });
      }]);
}());