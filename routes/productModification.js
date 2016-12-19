var express = require("express");
var router = express.Router();
var productModifcationService=require("../service/productModificationService.js")
router.post('/updateInventory',function(req,res,next){
    new productModifcationService(req,res).updateItemInventory(req.params.itemId,req.params.storeId,req.params.itemQuantity);
});

router.post('/createNewProduct',function(req,res,next){

    new productModifcationService(req,res).createNewProduct(req.body);
    res.render('fileUpload');
});

module.exports = router;
