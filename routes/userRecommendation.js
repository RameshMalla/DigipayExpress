var express = require("express");
var router = express.Router();
var recommendationService=require("../service/recomendationService.js")
router.get('/getRecommendations/:userId',function(req,res,next){
    new recommendationService(req,res).getRecommendations(req.params.userId);
  //  res.render('recommendations');
})


module.exports =router;