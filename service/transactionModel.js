var mongodb = require("mongoose");
var Schema = mongodb.Schema;
// Define defect schema
var TransactionSchema = new Schema({
  storeId: String,
  userId: String,
  amountPayed: String,
  modeOfPayment: String,
  bankName: String,
  transactionDate: {
    type: Date,
    default: Date.now
  },
  itemsPurchased: [Schema.Types.Mixed]
});

module.exports = mongodb.model('transactions',TransactionSchema);