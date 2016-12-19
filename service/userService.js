var models = require('./userModel.js');
var mongodb = require('mongoose');

function userService(requestBody, responseBody) {
  var UserModel = models.User;
  var CounterModel = models.Counter;
  var UserSchema = mongodb.model('users').schema;
  this.addNewUser = function() {


    // Pre create update the id in counter
    UserSchema.pre('save', function(next) {
      var doc = this;
      CounterModel.findByIdAndUpdate({
        _id: 'entityId'
      }, {
        $inc: {
          seq: 1
        }
      }, function(error, counter) {
        if (error)
          return next(error);
        // inject the generated sequence in the defect object
        doc.offerId = "OFR" + counter.seq;
        doc.userRegisteredDate = new Date();
        next();
      });
    });


    var newUser = new UserModel(requestBody);


    newUser.save(function(err, newUser) {
      if (err) {
        //return console.error(err);
        var message = null;
        console.log(err);
        if (typeof err.errmsg != 'undefined' && err.errmsg.indexOf('duplicate')) {
          message = "User already registered";
        }
        responseBody.status(200);
        responseBody.json(message);
      } else {
        responseBody.status(201);
        responseBody.json(newUser);
      }

    });
  }

  this.updateQpayUser = function(phoneNumber) {
    console.log(JSON.stringify(requestBody));
    UserModel.findOne({
      phoneNumber: phoneNumber
    }, function(err, response) {
      if (err)
        throw err;
      if (response != null) {
        responseBody.status(200);
        response.quickPay = requestBody;
        response.save();
        responseBody.json(response);
      } else {
        responseBody.json(null);
        responseBody.status(404);
      }
    })
  }

  this.getUser = function(phoneNumber) {
    UserModel.findOne({
      phoneNumber: phoneNumber
    }).exec(function(err, user) {
      if (err)
        throw err;
      if (user != null) {
        responseBody.status(200);
        responseBody.json(user);
      } else {
        responseBody.json(null);
        responseBody.status(404);
      }

    });
  }

  this.checkUser = function(phoneNumber) {
    UserModel.findOne({
      phoneNumber: phoneNumber,
      isLoggedIn: true
    }).exec(function(err, user) {
      if (err)
        throw err;
      if (user != null) {
        responseBody.status(200);
        responseBody.json(user);
      } else {
        responseBody.json(null);
        responseBody.status(404);
      }

    });
  }

  this.updateIsSharrable = function(phoneNumber, flag) {
    UserModel.findOneAndUpdate({
      phoneNumber: phoneNumber
    }, {
      isSharable: flag,
    }, {
      new: true
    }, function(err, user) {
      if (err)
        throw err;
      responseBody.status(200);
      console.log(user);
      responseBody.json(user);
    })
  }
}
module.exports = userService;
