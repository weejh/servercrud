var express = require('express')
var app = express()
var birds = require('./birds')
app.use('/birds', birds)
