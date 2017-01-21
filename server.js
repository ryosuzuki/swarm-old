const express = require('express');
const fs = require('fs');
const os = require('os');
const bodyParser = require('body-parser')
const Datastore = require('nedb')
const moment = require('moment')
const async = require('async')
const _ = require('lodash')

const app = express();
const port = process.env.PORT || 5000

app.use(bodyParser.json());
app.use(express.static(__dirname + '/'))
app.use('/', express.static(__dirname + '/'))
app.set('json spaces', 2);


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.listen(port, function(error) {
  if (error) throw error
    console.log('Express server listening on port', port)
})


