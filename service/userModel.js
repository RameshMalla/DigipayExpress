var mongodb = require('mongoose');
var Schema = mongodb.Schema;


var UserSchema = new Schema({
  phoneNumber: {
    type: String,
    unique: true,
    required: true
  },
  offerId: String,
  emailId: {
    type: String,
    unique: true,
    required: true
  },
  isLoggedIn: {
    type: Boolean,
    default: true
  },
  isSharable: {
    type: Boolean,
    default: true
  },
  transactionsMade: [String],
  userRegisteredDate: {
    type: Date
  },
  userUpdatedDate: {
    type: Date,
    default: Date.now
  },
  meregdAccounts: [String],
  jointAccounts: [String],
  quickPay: Schema.Types.Mixed
});
// Define counter schema
var CounterSchema = Schema({
  _id: {
    type: String,
    required: true
  },
  seq: {
    type: Number,
    default: 0
  }
});
var User = mongodb.model('users', UserSchema);
var Counter = mongodb.model('counters', CounterSchema);

module.exports = {
  User: User,
  Counter: Counter
}

// module.exports = mongodb.model('users', UserSchema);
// module.exports = mongodb.model('counters', CounterSchema);
