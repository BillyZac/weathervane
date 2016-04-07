(function() {
  angular.module('app')
    .factory('forecastService', ['$http', forecastService])

    function forecastService($http) {
      var service = {
          getForecast: getForecast,
          hello: 42
      }
      return service

      function getForecast() {
        return new Promise(function(resolve, reject) {
          $http({
            method: 'GET',
            url: 'https://afternoon-beach-62638.herokuapp.com/4463523'
          })
            .then(function(response) {
              var days = []
              console.log(response);
              var dataPoints = response.data.body.list
              var index = 0
              for (dayCounter = 1; dayCounter <=5; dayCounter++) {
                var day = dataPoints.slice(index, index + 8)
                console.log(minMaxTemperature(day))

                var dayToPush = {
                  time: dataPoints[index].dt * 1000, // Time comes back in seconds. Convert to milliseconds.
                  minimumTemperature: minMaxTemperature(day).minimumTemperature,
                  maximumTemperature: minMaxTemperature(day).maximumTemperature,
                  weather: dataPoints[index].weather[0].main
                }

                days.push(dayToPush)

                index += 8
              }

              resolve({
                cityName: response.data.body.city.name,
                days: days
              })
            })

        })
      }
    }

    function minMaxTemperature(dataPoints) {
      var temps = dataPoints.reduce(function(prev, current) {
        prev.push(current.main.temp)
        return prev
      }, [])
      return {
        minimumTemperature: Math.min(...temps),
        maximumTemperature: Math.max(...temps)
      }
    }

}())
