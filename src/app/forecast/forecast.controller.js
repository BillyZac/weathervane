(function(){
  angular.module('app')
    .controller('ForecastController', ['$scope', 'forecastService', ForecastController])

  function ForecastController($scope, forecastService) {
    var vm = this

    forecastService.getForecast()
      .then(function(response) {
        vm.cityName = response.cityName
        vm.days = response.days
        $scope.$apply()
      })
      .catch(function(reason) {
        console.log('There was an error:', reason);
      })
  }
}())
