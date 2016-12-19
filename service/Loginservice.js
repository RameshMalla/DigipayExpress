var adminUsers = require('./adminuserModels.js');

function Loginservice(request, response) {

  this.login = function(requestBody) {
    console.log("Login Service");
    adminUsers.findOne({userId:requestBody.userName,password:requestBody.password},function(err,data){
        if (data == null){
            var session =request.session;
            session.userId=requestBody.userName;
            session.storeId = requestBody.storeId;
            console.log('session is'+JSON.stringify(session));
        }

    })

}

this.logut = function() {
    console.log("Analytics Service");
   request.session.destroy();

}

this.register = function(requestBody) {
    console.log("Analytics Service");
    adminUsers.findOne({userId:requestBody.userName,password:requestBody.password},function(err,data){
        if (data==null){
            var users =new adminUsers();
            users.userId=requestBody.userName;
            users.password=requestBody.password;
            users.storeId=requestBody.storeId;
            users.save();
            request.session.userId=requestBody.userName;
            request.session.storeId = requestBody.storeId;
        }

    })

}
}
module.exports = Loginservice;
