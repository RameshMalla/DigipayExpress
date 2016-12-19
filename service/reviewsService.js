var ReviewModel = require('./reviewsModel.js');

function ReviewService(requestBody, responseBody) {



    this.getReviews = function(itemId, phoneNumber) {
        ReviewModel.findOne({
            itemId: itemId,
            'userReviews.phoneNumber': phoneNumber
        }, {
            'userReviews.$': 1
        }, function(err, resp) {
            if (err) {
                console.log(err);
            } else if (resp == null) {
                responseBody.status(200);
                responseBody.json(null);
            } else {
                //console.log(storeId);
                resp = Object(resp)
                    // resp.userReviews[0].displayName = requestBody.displayName;
                console.log("FROM Reviews " + resp);

                responseBody.status(200);
                responseBody.json(resp);
            }
        });
    }


    this.getALLREVIEWS = function(itemId) {
        ReviewModel.findOne({
            itemId: itemId
        }, function(err, resp) {
            if (err) {
                console.log(err);
            } else if (resp == null) {
                responseBody.status(200);
                responseBody.json(null);
            } else {
                //console.log(storeId);
                // resp = Object(resp)
                // resp.userReviews[0].displayName = requestBody.displayName;
                console.log("FROM Reviews ");
                console.log(resp);
                responseBody.status(200);
                responseBody.json(resp);
            }
        });
    }


    this.getAllReviews = function(itemId) {
        console.log("Review Service");
        console.log(typeof requestBody);
        ReviewModel.findOne({
            itemId: itemId,
            'userReviews.phoneNumber': requestBody.phoneNumber
        }, {
            'userReviews.$': 1
        }, function(err, resp) {
            if (err) {
                console.log(err);
            } else if (resp == null) {
                responseBody.status(200);
                responseBody.json(null);
            } else {
                //console.log(storeId);
                resp = Object(resp)
                resp.userReviews[0].displayName = requestBody.displayName;
                console.log("FROM Reviews " + resp);

                responseBody.status(200);
                responseBody.json(resp);
            }
        });
    }

    this.addNewItemForReview = function() {
        var newReviewItem = new ReviewModel(requestBody);
        newReviewItem.save(function(err, newReviewItem) {
            if (err) return console.error(err);
            responseBody.status(201);
            responseBody.json(newReviewItem);
        });
    }

    this.addNewReview = function(itemId) {
        console.log(itemId);
        console.log(requestBody);
        ReviewModel.findOneAndUpdate({
            itemId: itemId
        }, {
            $push: {
                userReviews: requestBody
            }
        }, {
            new: true
        }, function(err, resp) {
            if (err)
                throw err;
            responseBody.status(200);
            responseBody.json(resp);
        })
    }

    this.updatereviews = function(itemId, phoneNumber) {
        ReviewModel.findOneAndUpdate({
            itemId: itemId,
            userReviews: {
                '$elemMatch': {
                    phoneNumber: phoneNumber
                }
            }
        }, {
            $set: {
                'userReviews.$': requestBody
            }
        }, {
            new: true
        }, function(err, resp) {
            if (err) {
                console.log(err);
            } else if (resp == null) {
                responseBody.status(200);
                responseBody.json(null);
            } else {
                console.log("FROM Reviews " + resp);
                responseBody.status(200);
                responseBody.json(resp);
            }
        });
    }
}
module.exports = ReviewService;
