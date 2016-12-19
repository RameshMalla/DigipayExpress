var express = require('express');
var router = express.Router();
var offerService = require('../service/offerservice.js');
var io = require('../routes/streamer');

/* GET inventory listing. */

router.get('/getOffers', function(req, res, next) {
    new offerService(req.body, res).getAllInventories();
});

router.get('/getOffers/:storeId', function(req, res, next) {
    new offerService(req.body, res).getOfferByStoreId(req.params.storeId);
});

router.get('/getOffers/:storeId/:itemId', function(req, res, next) {
    new offerService(req.body, res).applyOffers(req.params.storeId, req.params.itemId);
});

router.get('/getOffersbyofferid/:storeId/:offerId', function(req, res, next) {
    new offerService(req.body, res).getOffersByOfferId(req.params.storeId, req.params.offerId);
});

router.get('/transferoffer/:storeId/:phoneNumber/:itemId/:offerId/:toOfferId', function(req, res, next) {
    console.log("Transfer");
    var obj = {
        "fromNumber": req.params.phoneNumber,
        "toOfferId": req.params.toOfferId
    }
    io.emit('transferNotification', obj);
    new offerService(req.body, res).transferOfferId(req.params.storeId, req.params.itemId, req.params.offerId, req.params.toOfferId);
});

router.get('/removeOffer/:storeId/:itemId/:offerId', function(req, res, next) {
    new offerService(req.body, res).removeOfferForUser(req.params.storeId, req.params.itemId, req.params.offerId);
});

module.exports = router;
