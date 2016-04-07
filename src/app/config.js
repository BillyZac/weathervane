(function () {
  angular.module('app')
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', configRoutes])

  function configRoutes($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
          .state('forecast', {
            url: '/',
            templateUrl: 'app/forecast/forecast.html',
            controller: 'ForecastController as forecast'
          })

          $urlRouterProvider.otherwise('/')
    }
}())
