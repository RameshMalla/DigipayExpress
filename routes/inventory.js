var express = require('express');
var router = express.Router();
var inventoryService = require('../service/inventoryService.js');
var io = require('../routes/streamer');

/* GET inventory listing. */

router.get('/getItems', function(req, res, next) {
  new inventoryService(req.body, res).getItemList();
});

router.get('/getItemById/:storeId/:itemId', function(req, res, next) {
  io.emit('testing', 'Getting User');
  new inventoryService(req.body, res).getItemById(req.params.storeId, req.params.itemId);
});

router.get('/getItems/:storeId', function(req, res, next) {
  new inventoryService(req.body, res).getItemByStoreId(req.params.storeId);
});



module.exports = router;
