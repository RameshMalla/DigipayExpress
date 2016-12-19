var express = require('express');
var router = express.Router();
var analyticsService = require('../service/analyticsService.js');

/* GET inventory listing. */

router.get('/getAnalytics', function(req, res, next) {
  console.log("GET Analytics");
  var storeId=req.session.storeId;
  new analyticsService(req.body, res).getAllAnalyticData(storeId);
});

module.exports = router;
