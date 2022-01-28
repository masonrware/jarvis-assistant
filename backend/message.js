var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var moment = require('moment');

require('dotenv').config();

var messagebird = require('messagebird')(process.env.MESSAGEBIRD_API_KEY);

// var AppointmentDatabase 