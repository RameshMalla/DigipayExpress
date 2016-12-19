var mongodb = require('mongoose');
var Schema = mongodb.Schema;


var recomendationSchema = new Schema({
  userId: String,
  inventory: [Schema.Types.Mixed]
});

module.exports = mongodb.model('recommendations', recomendationSchema);