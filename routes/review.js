const express = require('express');
const router = express.Router({ mergeParams: true });
const Listing = require('../models/listing.js');
const Review = require('../models/review.js');
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {
   validatereview,
    isLoggedIn,
     isReviewAuthor
     } = require('../middleware.js');

const reviewController  = require('../controller/review.js');


// Post review route needs /:id/reviews path now
router.post("/:id/reviews",isLoggedIn, validatereview, wrapAsync(reviewController.createReview));

// Delete review route with :id and :reviewId params
router.delete("/:id/reviews/:reviewId",isLoggedIn,
  isReviewAuthor, wrapAsync(reviewController.deleteReview ));

module.exports = router;