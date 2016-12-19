var InventoryModel = require('./inventoryModel.js');
var OffersModel = require('./offerModel.js');

function inventoryService(requestBody, responseBody) {

  /*Item List*/
  this.getItemList = function() {

    InventoryModel.find({}).exec(function(err, inventories) {
      responseBody.json(inventories);
    });
  }

  this.getItemByStoreId = function(storeId) {
    InventoryModel.find({
      storeId: storeId
    }).exec(function(err, inventories) {
      responseBody.json(inventories);
    });
  }

  /*Item BY ID and store id*/
  this.getItemById = function(storeId, itemId) {
    console.log(storeId + " " + itemId);
    InventoryModel.findOne({
      storeId: storeId,
      itemId: itemId
    }, function(err, inventory) {
      if (err)
        throw err;
      // object of the user
      if (inventory == null) {
        responseBody.status(404).send("Item Not found");
      } else {
        inventory = inventory.toObject();
        //console.log("ITEMS");
        getOfferDetails(storeId, itemId, function(offerDetails) {
          if (offerDetails != null && offerDetails.offerType == 'discount') {
            var discountedPrice = inventory.itemPrice - ((Number(offerDetails.discountRate) / 100) * Number(inventory.itemPrice));
            inventory.discountPrice = discountedPrice;
            inventory.totalPrice = inventory.discountPrice;
            inventory.discountAvailed = offerDetails.discountRate + "% off"
            console.log(inventory.discountAvailed);
          } else {
            inventory.discountPrice = null;
            inventory.totalPrice = inventory.itemPrice;
          }

          inventory.totalQuantity = 1;
          responseBody.status(200);
          responseBody.json(inventory);
        });
      }
    });

  }

  this.updateInventoryQuantity = function(storeId, itemId, updateQuantity) {
    InventoryModel.findOneAndUpdate({
      storeId: storeId,
      itemId: itemId
    }, {
      itemQuantity: updateQuantity
    }, function(err, inventory) {
      if (err)
        throw err;
      console.log("Updated");
    });
  }

  /*Item BY ID and store id*/
  this.getNewItemById = function(storeId, itemIds) {
    console.log(storeId + " " + itemIds);
    InventoryModel.find({
      storeId: storeId,
      itemId: {
        $in: itemIds
      }
    }, function(err, inventory) {
      if (err)
        throw err;
      // object of the user
      if (inventory == null) {
        responseBody.status(404).send("Item Not found");
      } else {
        responseBody.status(200);
        responseBody.json(inventory);
      }
    });

  }



  var getOfferDetails = function(storeId, itemId, callback) {
    OffersModel.findOne({
      storeId: storeId,
      itemId: itemId
    }, function(err, offerDetails) {
      if (err)
        throw err;
      callback(offerDetails);
    });
  }
}

module.exports = inventoryService;
