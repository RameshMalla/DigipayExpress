var mongodb = require('mongoose');
var Schema = mongodb.Schema;


var adminuserschema = new Schema({
  userId: String,
  password: String,
  storeId: String
});
module.exports = mongodb.model('adminusers', adminuserschema);
