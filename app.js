const express = require('express');
var validator = require('validator');
var myConverter = require('./myConverter');
var logging = require('./logging');
var billyTools = require('billy-tools');
var fs = require('fs');
var morgan = require('morgan');
var path = require('path');
const app = express();
const port = process.env.VIRTUAL_PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
app.set('view engine', 'pug');

// this is for logging
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'http_traffic.log'), { flags: 'a' });
app.use(morgan(logging, { stream: accessLogStream }));

app.get('/', (req, res) => {
  
  res.render('index', {
    model: {fahrenheit: 0, celsius: -17, error: ""}
  })

})

app.post('/', (req, res) => {
  
  var valueToConvert = req.body.fahrenheit;
  var isValid = validator.isInt(req.body.fahrenheit);
  var indexModel = {fahrenheit: 0, celsius: -17, error: ""};

  if (!isValid) {
    var errorMsg = "The value " + valueToConvert + " is not value";
    indexModel = {fahrenheit: 0, celsius: -17, error: errorMsg};
  }
  else {
    var celsius = billyTools.toCelsius(valueToConvert) | 0;
    //var celsius = myConverter.toCelsius(valueToConvert) | 0;
    indexModel = {fahrenheit: valueToConvert, celsius: celsius, error: ""};
  }

  res.render('index', {
    model: indexModel
  }) 
})

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})