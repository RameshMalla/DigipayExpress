var express = require('express');
var router = express.Router();
var storeService = require('../service/storeService.js');

/* GET stores listing. */
router.get('/getstoredetails/:storeId', function(req, res, next) {
  new storeService(req.body, res).getStoreById(req.params.storeId)
//res.send('respond with a resource');
});
//
// router.post('/addnewuser', function(req, res, next) {
//   console.log("Adding New User");
//   new userService(req.body, res).addNewUser();
// })
//
// router.get('/finduser/:phoneNumber', function(req, res, next) {
//   console.log("Find User");
//   new userService(req.body, res).getUser(req.params.phoneNumber);
// })
//
// router.post('/updateqpay/:phoneNumber', function(req, res, next) {
//   console.log("Update User");
//   new userService(req.body, res).updateQpayUser(req.params.phoneNumber);
// })

module.exports = router;
