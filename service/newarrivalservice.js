var InventoryModel = require('./inventoryModel.js');
var ArrivalModel = require('./newarrivalModel.js');

function newArrivalservice(requestBody, responseBody) {
  this.addNewArrivals = function() {
    var newArrival = new ArrivalModel(requestBody);
    newArrival.save(function(err, newArrival) {
      if (err) return console.error(err);
      responseBody.status(201);
      responseBody.json(newArrival);
    });
  }

  this.getNewArrivals = function(storeId) {
    ArrivalModel.find({
      storeId: storeId
    }).exec(function(err, newArrival) {
      if (err)
        throw err;
      if (newArrival != null) {
        responseBody.status(201);
        responseBody.json(newArrival);
      } else {
        responseBody.status(404);
      }

    });
  }
}
module.exports = newArrivalservice;
