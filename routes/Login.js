var express = require('express');
var router = express.Router();
var loginservice = require('../service/Loginservice.js');
var io = require('../routes/streamer');

/* GET inventory listing. */

router.post('/login', function(req, res, next) {
  new loginservice(req, res).login(req.body);
  req.session.storeId = req.body.storeId;
  res.redirect('/');
});

router.get('/logout', function(req, res, next) {
  new loginservice(req, res).logut();
  res.redirect('/');
});

router.post('/register', function(req, res, next) {
  new loginservice(req, res).register(req.body);
  req.session.storeId = req.body.storeId;
  res.redirect('/');
});

module.exports = router;
