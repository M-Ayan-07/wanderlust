const Listing = require("./models/listing");
const Review = require("./models/review");
const {listingSchema,reviewSchema} = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js"); 


module.exports.isLoggedIn = (req, res, next) => {
      if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
    req.flash("error","You must be signed in first!");
    return res.redirect("/login");
  }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
  } 
  next();
};

module.exports.isOwner = async (req, res, next) => {
  const {id} = req.params;
  const listing = await Listing.findById(id);
  if(!listing.owner.equals(res.locals.currentUser._id)){
    req.flash("error","You are not the owner of this listing");
    return res.redirect(`/listings/${id}`);
  }
  next();
}

module.exports.validateListing = (req,res,next) => {
  
    let {error} = listingSchema.validate(req.body);
   
   if(error) {
    let ermsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, ermsg);
   } else {
    next();
   }
  };

  module.exports.validatereview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
      let ermsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, ermsg);
    } else {
      next();
    }
  };
  

  module.exports.isReviewAuthor = async (req, res, next) => {
    const { id,reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(res.locals.currentUser._id)) {
      req.flash("error", "You are not the author of this review");
      return res.redirect(`/listings/${id}`); // Assuming 'id' is available in this scope
    }
    next();
  };