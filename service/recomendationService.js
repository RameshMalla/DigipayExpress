var ArrivalModel = require('./newarrivalModel.js');
var discountModel =require("./offerModel.js");
var transactionModel = require("./transactionModel.js");
var InventoryModel = require("./inventoryModel.js");
var userModel = require("./userModel.js");
var recommendationModel = require("./recommendationModel.js");
function recommendationService(requestBody,responseBody){


    this.setRecommendations = function(){
        var date =new Date();

        date.setDate(date.getDate()-30);
         var UserModels = userModel.User;
        UserModels.find({},function(err, data){
        // console.log('userids are is'+JSON.stringify(data));
         if(err) throw err;
        var map =new Map();
        var itemIDs =[];
        var finalRecommendations=[];
         for(var userids=0;userids<data.length;userids++){
             var phoneNumber=data[userids].phoneNumber;
            transactionModel.find({userId:phoneNumber,transactionDate:{$gt:date}}).exec(function(err,data){
            //console.log('1 is'+JSON.stringify(data));

            for (var i=0;i<data.length;i++){
                var itemPurchased=data[i].itemsPurchased;
                setCatArray(itemPurchased,map);
            }

        }).then(function(){
           // console.log(JSON.stringify(map));
            map.forEach(function (value, key) {
               /* console.log('key is '+key);
                console.log('value is '+value);*/
            ArrivalModel.find({itemCategory:key,itemSubCategory:{$in:value}},function(err,data){
                /* console.log('2 is'+JSON.stringify(data));*/
                for(var k=0;k<data.length;k++){
                itemIDs.push(data[k].itemId);
                }
            });
            discountModel.find({itemCategory:key,itemSubCategory:{$in:value}},function(err, data) {
              /*   console.log('3 is'+JSON.stringify(data));*/
                if(data!=null && data.length>0){
                    for(var h=0;h<data.length;h++){
                    InventoryModel.find({itemCategory:data[h].itemCategory,itemSubCategory:data[h].itemSubCategory},
                    function(err, data) {
                          /*console.log('6 is'+JSON.stringify(data));*/
                        for(var l=0;l<data.length;l++){
                           // console.log(JSON.stringify(data[l]));
                            finalRecommendations.push(data[l]);
                        }
                    }).then(function(){
                         InventoryModel.find({itemId:{$in:itemIDs}},function(err, data) {
                         //console.log('4 is'+JSON.stringify(data));
                         for(var m=0;m<data.length;m++){
                            finalRecommendations.push(data[m]);
                        }

        }).then(function(){
            /*console.log("7 is **********");
            responseBody.status(201);
            responseBody.send(finalRecommendations);*/
            /*console.log('finalRecommendations is ' +finalRecommendations);*/
            recommendationModel.findOne({userId:phoneNumber},function(err,recommendationdata){
                if(recommendationdata!=null){
                recommendationdata.inventory = finalRecommendations;
                 recommendationdata.markModified('inventory');
                recommendationdata.save();
                }
                else{
                    var recommendationModeltosave = new recommendationModel();
                    recommendationModeltosave.userId=phoneNumber;
                    recommendationModeltosave.inventory=finalRecommendations;
                    recommendationModeltosave.markModified('inventory');
                    recommendationModeltosave.save();
                }

            })
        });
                        });
                    }
                }
            });
        });

        });
         }
    });
    }

    this.getRecommendations = function(userId){
        recommendationModel.find(function(err,data){
            if(err) throw err;
            if(data!=null){
                responseBody.status(201);
                responseBody.send(data[0]);
            }
        })
    }
    function setCatArray(itemPurchasedArray,map){
        /*console.log('5 is'+JSON.stringify(itemPurchasedArray));
         console.log('map size is ' + map.size);*/
        for(var l=0;l<itemPurchasedArray.length;l++){
            var itemPurchased = itemPurchasedArray[l];
            //console.log('itemPurchased is'+JSON.stringify(itemPurchased));
       if(map.size >0 && map.has(itemPurchased.itemCategory)){
           var arr =map.get(itemPurchased.itemCategory);
           arr.push(itemPurchased.itemSubCategory);
       }
       else{
           var subCatArray=[];
           subCatArray.push(itemPurchased.itemSubCategory);
           map.set(itemPurchased.itemCategory , subCatArray);
          // console.log('map is' + JSON.stringify(map));
       }
        }

    }
}

module.exports=recommendationService;
