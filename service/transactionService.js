var mongodb = require('mongoose');
var models = require('./userModel.js');
var inventoryService = require('../service/inventoryService.js');
var analyticsModel = require('./analyticsModel.js');

var TransactionModel =require('./transactionModel.js');
/*var Schema = mongodb.Schema;
// Define defect schema
var TransactionSchema = new Schema({
  storeId: String,
  userId: String,
  amountPayed: String,
  modeOfPayment: String,
  bankName: String,
  transactionDate: {
    type: Date,
    default: Date.now
  },
  itemsPurchased: [Schema.Types.Mixed]
});*/

function transactionService(requestBody, responseBody) {
  //var TransactionModel = mongodb.model('transactions', TransactionSchema);
  var UserModel = models.User;
  this.enterTransactionDetails = function(phoneNumber) {
    var newTransaction = new TransactionModel(requestBody);
    newTransaction.save(function(err, newTransaction) {
      if (err) return console.error(err);
      for (var i = 0; i < newTransaction.itemsPurchased.length; i++) {
        var newItemQuantity = Number(newTransaction.itemsPurchased[i].itemQuantity) - Number(newTransaction.itemsPurchased[i].totalQuantity);
        new inventoryService(null, null).updateInventoryQuantity(newTransaction.itemsPurchased[i].storeId, newTransaction.itemsPurchased[i].itemId, newItemQuantity);
      }
      UserModel.findOneAndUpdate({
        phoneNumber: "9940366400"
      }, {
        $push: {
          "transactionsMade": newTransaction._id
        }
      }, function(error, updatedUser) {
        console.log("Transactions Updated for User");
      });

      analyticsModel.findOne({
        storeId: newTransaction.storeId
      }, function(err, resp) {
        if (err) {
          console.log(err);
        } else {

          console.log(newTransaction.storeId);
          for (var i = 0; i < newTransaction.itemsPurchased.length; i++) {
            var category = newTransaction.itemsPurchased[i].itemCategory;
            var subCategory = newTransaction.itemsPurchased[i].itemSubCategory;
            var brand = newTransaction.itemsPurchased[i].itemBrand;
            var name = newTransaction.itemsPurchased[i].itemName;
            var quantity = newTransaction.itemsPurchased[i].totalQuantity;

            console.log(category + " " + subCategory + " " + brand + " " + name + " " + quantity);
            if (resp.categories != null) {
              for (var j = 0; j < resp.categories.length; j++) {
                var categoryArray = resp.categories[j];
                if (categoryArray.category == category) {
                  categoryArray.analytics[0] = categoryArray.analytics[0] + 1;
                  categoryArray.analytics[1] = categoryArray.analytics[1] + 1;
                  categoryArray.analytics[2] = categoryArray.analytics[2] + 1;
                }
                // if(categoryArray.subCategory){
                //
                // }
                for (var k = 0; k < categoryArray.subCategory.length; k++) {
                  var subCategoryAray = categoryArray.subCategory[k];
                  if (subCategoryAray.category == subCategory) {
                    subCategoryAray.analytics[0] = subCategoryAray.analytics[0] + 1;
                    subCategoryAray.analytics[1] = subCategoryAray.analytics[1] + 1;
                    subCategoryAray.analytics[2] = subCategoryAray.analytics[2] + 1;
                  }
                  for (var l = 0; l < subCategoryAray.brand.length; l++) {
                    var brandArray = subCategoryAray.brand[l];
                    if (brandArray.category == brand) {
                      brandArray.analytics[0] = brandArray.analytics[0] + 1;
                      brandArray.analytics[1] = brandArray.analytics[1] + 1;
                      brandArray.analytics[2] = brandArray.analytics[2] + 1;
                    }
                    for (var m = 0; m < brandArray.name.length; m++) {
                      var nameArray = brandArray.name[m];
                      if (nameArray.category == name) {
                        nameArray.analytics[0] = nameArray.analytics[0] + 1;
                        nameArray.analytics[1] = nameArray.analytics[1] + 1;
                        nameArray.analytics[2] = nameArray.analytics[2] + 1;
                      }
                    }
                  }
                }
              }
            }

          }
          resp.markModified('categories')
          console.log("FROM ANALYTICS " + JSON.stringify(resp));
          resp.save(function(err) {
            console.log("YEP ERROR " + err);
          });
        }
      });

      responseBody.status(201);
      responseBody.json(newTransaction);
    })
  }


  this.getTransactionDetailsWithItemId = function(phoneNumber, itemId) {
    TransactionModel.find({
      userId: phoneNumber,
      itemsPurchased: {
        '$elemMatch': {
          itemId: itemId
        }
      }
    }, function(error, transactionDetails) {
      if (error) {
        responseBody.status(300);
        responseBody.json(error);
      } else if (transactionDetails == null || transactionDetails.length == 0) {
        responseBody.status(404);
        responseBody.json(false);
      } else {
        console.log(transactionDetails);
        responseBody.status(200);
        responseBody.json(true);
      }
    })
  }

  this.getTransactionDetails = function(phoneNumber) {
    TransactionModel.find({
      userId: phoneNumber
    }, function(error, transactionDetails) {
      if (error) {
        responseBody.status(300);
        responseBody.json(error);
      } else if (transactionDetails == null) {
        responseBody.status(404);
        responseBody.json("No transactions were found");
      } else {
        responseBody.status(200);
        responseBody.json(transactionDetails);
      }
    })
  }
}

module.exports = transactionService;
