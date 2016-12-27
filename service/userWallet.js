var mongodb=require("mongoose");
var Schema = mongodb.Schema;


var userWallet = new Schema({
    phoneNumber:{
     required:true,
     type:String,
     unique:true
    },
    emailId:String,
    totalAmount:Number,
    lastTransactionDate:Date,
    lastTransactionAmount:Number,
      transactions:[Schema.Types.Mixed]
    });
    
    

module.exports=mongodb.model('userWallet',userWallet);

