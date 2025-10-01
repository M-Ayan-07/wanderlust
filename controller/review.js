const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createReview = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newreview = new Review(req.body.review);
  newreview.author = req.user._id;
   console.log(newreview);
  listing.reviews.push(newreview);
  await newreview.save();
  await listing.save();
  req.flash("success","Created new review");
  res.redirect(`/listings/${listing._id}`);
};

module.exports.deleteReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  let deletedreview = await Review.findByIdAndDelete(reviewId);
  console.log(deletedreview);
  req.flash("success","Successfully deleted a review");
  res.redirect(`/listings/${id}`);
};