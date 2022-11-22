
function toCelsius(fahrenheit) {
  
  var celcius = (fahrenheit - 32) * 5 / 9;
  return celcius;
}

function toFahrenheit(celsius) {

  var fahrenheit = (celsius * 9 / 5) + 32;
  return fahrenheit;
}

module.exports = { toCelsius, toFahrenheit };