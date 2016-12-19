var mongodb = require('mongoose');
var Schema = mongodb.Schema;


var InventorySchema = new Schema({
  storeId: String,
  itemId: String,
  itemName: String,
  itemCategory: String,
  itemSubCategory: String,
  itemBrand: String,
  itemDescription: String,
  itemPrice: String,
  itemQuantity: Number,
  itemImage: String
});
module.exports = mongodb.model('inventorys', InventorySchema);
