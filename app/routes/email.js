var express = require('express');
var router = express.Router();
var app = require('../app.js')

let message = {};

router.post('/email', function(req, res, next) {
  message = req.body;
  console.log(message)
  if (req.body) {
    app.mail();
  }
  else {
    console.log('no mail.');
  }
});

module.exports = router;