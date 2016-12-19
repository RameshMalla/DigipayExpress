var mongodb = require('mongoose');
var Schema = mongodb.Schema;


var ReviewSchema = new Schema({
  itemId: String,
  userReviews: [Schema.Types.Mixed]
});

module.exports = mongodb.model('reviews', ReviewSchema);
