var InventoryModels = require('./inventoryModel.js');
function productModificationService(requestBody,responseBody){

    this.updateItemInventory = function(itemId,storeId,inventory){
        InventoryModels.findOneAndUpdate({itemId: itemId,storeId:storeId},{
             itemQuantity: inventory
            }, function(err, inventory) {
          if (err) throw err;
          if(inventory!=null){
            responseBody.status(200);
            responseBody.json(inventory);
          }
            });

    }
    this.createNewProduct = function(reqParams){
        console.log('inside creation');
        console.log(JSON.stringify(reqParams));
        InventoryModels.update({itemId: reqParams.itemId,storeId:reqParams.storeId},
       { $set:{
                             itemName:reqParams.itemName,
                             itemCategory:reqParams.category,
                             itemSubCategory:reqParams.subCategory,
                             itemBrand:reqParams.brand,
                             itemPrice:reqParams.itemPrice,
                             itemQuantity:reqParams.quantity,
                             itemImage:reqParams.image
        }}, {upsert:true},function(err,product){
        if (err) throw err;
        });

}

}
module.exports = productModificationService;
