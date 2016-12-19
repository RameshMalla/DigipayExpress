var StoreModel = require('./storeModel.js');

function storeService(requestBody, responseBody) {

  this.getStoreById = function(storeId) {
    StoreModel.findOne({
      storeId: storeId
    }, function(err, resp) {
      if (err) {
        responseBody.json(null);
      } else if (resp == null) {
        responseBody.status(200);
        responseBody.json(null);
      } else {
        resp = Object(resp)
        responseBody.status(200);
        responseBody.json(resp);
      }
    });
  }

}
module.exports = storeService;
