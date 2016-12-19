var InventoryModel = require('./inventoryModel.js');
var OffersModel = require('./offerModel.js');

function offerservice(requestBody, responseBody) {
  this.getAllInventories = function() {
    var modifedData = [];
    InventoryModel.find({}).exec(function(err, inventories) {
      if (err)
        throw err;
      responseBody.status(200);
      responseBody.json(inventories);
    });
  }


  this.removeOfferForUser = function(storeId, itemId, offerId) {
    console.log(storeId);
    console.log(itemId);
    console.log(offerId);
    OffersModel.findOne({
      storeId: storeId,
      itemId: itemId
    }, function(err, offerDetails) {
      if (err)
        throw err;
      if (offerDetails != null && offerDetails.userId != null) {
        offerDetails.userId.splice(offerDetails.userId.indexOf(offerId), 1);
        if (offerDetails.userId == null || offerDetails.userId.length == 0) {
          offerDetails.remove();
        // responseBody.status(200);
        // responseBody.json("Removed");
        } else {
          offerDetails.save();
        // responseBody.status(200);
        // responseBody.json(offerDetails);
        }
      }
      // console.log("OFFER DEATILSS");
      // console.log(offerDetails);

    });
  }

  this.getOfferByStoreId = function(storeId) {
    OffersModel.find({
      storeId: storeId,
      userId: null
    }).exec(function(err, offers) {
      if (err)
        throw err;
      responseBody.status(200);
      responseBody.json(offers);
    });
  }

  this.applyOffers = function(storeId, itemId) {
    OffersModel.findOne({
      storeId: storeId,
      itemId: itemId
    }, function(err, offerDetails) {
      if (err)
        throw err;
      responseBody.status(200);
      responseBody.json(offerDetails);
    });
  }

  this.getOffersByOfferId = function(storeId, offerId) {
    console.log(offerId);
    OffersModel.find({
      storeId: storeId,
      userId: offerId
    }, function(err, offerDetails) {
      if (err)
        throw err;
      responseBody.status(200);
      responseBody.json(offerDetails);
    });
  }

  this.transferOfferId = function(storeId, itemId, offerId, toOfferId) {
    console.log(offerId);
    OffersModel.findOne({
      itemId: itemId,
      storeId: storeId,
      userId: offerId
    }, function(err, offerDetails) {
      if (err)
        throw err;
      offerDetails.userId.splice(offerDetails.userId.indexOf(offerId), 1);
      offerDetails.userId.push(toOfferId);
      offerDetails.save();
      responseBody.status(200);
      responseBody.json(offerDetails);
    });
  }



}
module.exports = offerservice;
