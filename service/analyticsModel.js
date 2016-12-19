var mongodb = require('mongoose');
var Schema = mongodb.Schema;


var AnalyticsSchema = new Schema({
  storeId: String,
  categories: [Schema.Types.Mixed]
});

module.exports = mongodb.model('analytics', AnalyticsSchema);
