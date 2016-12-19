var offerModel =require("./offerModel.js");
var InventoryModel = require("./inventoryModel.js");
function discountUpdateService(requestBody, resp){

    this.updateDiscountsbyCategoryAndSubCategory = function(storeId){
        console.log('storeid is' + storeId);
        var finalQuery={};
        console.log(JSON.stringify(requestBody));
        if(requestBody.category!=null){
        var query = {itemCategory:requestBody.category};
        if(requestBody.subcategory!=null){
            query = {itemCategory:requestBody.category,itemSuubCategory:requestBody.subcategory};
        }
        if(requestBody.itemId!=null){
            query = {itemCategory:requestBody.category,itemSuubCategory:requestBody.subcategory,itemId:requestBody.itemId};
        }
        offerModel.update(query,
        {$set:{discountType:'discounts',discountRate:requestBody.discountRate,storeId:requestBody.storeId,userId:null}},
        {upsert:true},function(err,data){
           if(err)throw err;
           /*if(data!=null){
               resp.render('offersAndPromotion');
               resp.status(201);
               resp.send(data);

           }*/
        });
        }
        else if(requestBody.itemId!=null){
            updateDiscountById(requestBody.itemId,requestBody.storeId);
        }
    }
    function updateDiscountById(itemId,storeId){
    InventoryModel.find({itemId:itemId,storeId:storeId},function(err,inventory){
        console.log(JSON.stringify(inventory));
        offerModel.update({itemId:requestBody.itemId},
        {
            $set:
            { discountType:'discounts',
              discountRate:requestBody.discountRate,
              itemCategory:inventory[0].itemCategory,
              itemSuubCategory:inventory[0].itemSubCategory,
              storeId:storeId,
              userId:null
            }},
        {upsert:true},function(err,data){
         if(err)throw err;
         /*if(data!=null){
             resp.render('offersAndPromotion');
              resp.status(201);
               resp.send(data);

           }*/
});
});


    }
}

module.exports =discountUpdateService;
