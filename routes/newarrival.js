var express = require('express');
var router = express.Router();
var newarrivalService = require('../service/newarrivalservice.js');
var inventoryService = require('../service/inventoryService.js');

router.post('/addnewarrivals', function(req, res, next) {
  new newarrivalService(req.body, res).addNewArrivals();
})

router.get('/getNewArrivals/:storeId', function(req, res, next) {
  new newarrivalService(req.body, res).getNewArrivals(req.params.storeId);
});

module.exports = router;
