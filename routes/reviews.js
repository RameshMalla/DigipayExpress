var express = require('express');
var router = express.Router();
var reviewsService = require('../service/reviewsService.js');

/* GET inventory listing. */
router.get('/getreview/:itemId/:phoneNumber', function(req, res, next) {
  console.log("get all  Reviews");
  new reviewsService(req.body, res).getReviews(req.params.itemId, req.params.phoneNumber);
});

router.get('/getreviewsbyid/:itemId', function(req, res, next) {
  console.log("get ALL  Reviews");
  new reviewsService(req.body, res).getALLREVIEWS(req.params.itemId);
});

router.post('/getallreviews/:itemId', function(req, res, next) {
  console.log("get all  Reviews");
  new reviewsService(req.body, res).getAllReviews(req.params.itemId);
});


router.post('/updatereviews/:itemId/:phoneNumber', function(req, res, next) {
  console.log("Update Reviews");
  new reviewsService(req.body, res).updatereviews(req.params.itemId, req.params.phoneNumber);
});

router.post('/newreviewitem', function(req, res, next) {
  console.log("Add new item for Reviews");
  new reviewsService(req.body, res).addNewItemForReview();
});


router.post('/addnewreview/:itemId', function(req, res, next) {
  console.log("Add new Reviews");
  new reviewsService(req.body, res).addNewReview(req.params.itemId);
});

module.exports = router;
