var mongodb = require('mongoose');
var Schema = mongodb.Schema;


var OfferSchema = new Schema({
  storeId: String,
  itemId: String,
  itemCategory: String,
  itemSuubCategory: String,
  userId: [String],
  offerType: String,
  discountRate: String
});
module.exports = mongodb.model('offers', OfferSchema);
