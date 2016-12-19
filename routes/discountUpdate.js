var express = require("express");
var router = express.Router();
var discountUpdateService=require("../service/discountUpdateService.js");

router.get('/offers',function(req,res){
    console.log('Inside offers and promotions');
    res.render('offersAndPromotion');
});
router.post('/updateDiscount',function(req,res,next){
     var session = req.session;
     console.log("store id is "+ session.storeId);
     console.log("store id is "+ req);
    new discountUpdateService(req.body,res).updateDiscountsbyCategoryAndSubCategory(session.storeId);
    res.render('offersAndPromotion');
});

router.post('/updateDiscountByItemId',function(req,res,next){
    new discountUpdateService(req.body,res).updateDiscountsbyItemId();
    res.render('offersAndPromotion');
});



module.exports = router;
