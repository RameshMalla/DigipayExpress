var express = require('express');
var router = express.Router();
var userService = require('../service/userService.js');
var io = require('../routes/streamer');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/addnewuser', function(req, res, next) {
  console.log("Adding New User");
  new userService(req.body, res).addNewUser();
})

router.get('/updatesharrable/:phoneNumber/:sharrabeFlag', function(req, res, next) {
  new userService(null, res).updateIsSharrable(req.params.phoneNumber, req.params.sharrabeFlag);
})

router.get('/checkuser/:phoneNumber', function(req, res, next) {
  console.log("Find User");
  new userService(req.body, res).checkUser(req.params.phoneNumber);
})

router.get('/finduser/:phoneNumber', function(req, res, next) {
  console.log("Find User");
  new userService(req.body, res).getUser(req.params.phoneNumber);
})

router.post('/updateqpay/:phoneNumber', function(req, res, next) {
  console.log("Update User");
  new userService(req.body, res).updateQpayUser(req.params.phoneNumber);
})

router.post('/shareofferinfo/:phoneNumber', function(req, res, next) {
  console.log("Shre Item");
  var phoneNumberArray = req.body.numbers;
  var message = req.body.message;
  var from = req.params.phoneNumber;

  for (var i = 0; i < phoneNumberArray.length; i++) {
    var socketMessage = {
      "from": from,
      "number": phoneNumberArray[i],
      "message": message
    }
    io.emit('offernotification', socketMessage);

    console.log(socketMessage);
  }
  res.json("Shared");
  res.status(200);
//new userService(req.body, res).updateQpayUser(req.params.phoneNumber);
})

module.exports = router;
