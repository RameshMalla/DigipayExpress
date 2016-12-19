var mongodb = require('mongoose');
var Schema = mongodb.Schema;


var StoreSchema = new Schema({
  storeId: {
    type: String,
    unique: true,
    required: true
  },
  storeName: String,
  storePincode: String,
  storeState: String,
  storeCity: String,
  storePhoneNumber: String,
  stroeAddress: String
});

module.exports = mongodb.model('stores', StoreSchema);
