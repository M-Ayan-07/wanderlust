const Listing = require("../models/listing");

//index route
module.exports.index = async(req,res) => {
     const allListings =await Listing.find({});
     res.render("listings/index.ejs",{allListings});
     };

//New Route
module.exports.renderNewForm = (req,res) => {
    res.render("listings/new.ejs");
};

//show route
module.exports.showListing = async(req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({path :"reviews",
    populate : { path : "author" },
    })
    .populate("owner");
    if(!listing){
      req.flash("error","Cannot find that listing");
      return res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing})
};


//Create Route - Alternative version (allows no image)
module.exports.createListing = async (req, res, next) => {
    try {
        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        
        // Check if file exists before accessing properties
        if (req.file) {
            let url = req.file.path;
            let filename = req.file.filename;
            newListing.image = { url, filename };
        }
        // If no file, the image field will remain undefined
        
        let savedlisting = await newListing.save();
        console.log(savedlisting);
        req.flash("success", "New Listing Created");
        res.redirect("/listings");
    } catch (error) {
        next(error);
    }
}
//Edit Route
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if(!listing){
    req.flash("error","Cannot find that listing");
    return res.redirect("/listings");
  }
  let OriginalImageUrl =listing.image.url;
  OriginalImageUrl = OriginalImageUrl.replace("/upload","/upload/w_250");
  res.render("listings/edit.ejs", { listing ,OriginalImageUrl });
};


//Update Route
module.exports.updateListing = async (req, res) => {
   
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  
  if(typeof req.file !== 'undefined'){
  let url=req.file.path;
  let filename=req.file.filename;
  listing.image={url,filename};
  await listing.save();
  console.log(listing); 
};
  req.flash("success","Successfully updated a listing");
  res.redirect(`/listings/${id}`);
};



//Delete Route
module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success","Successfully deleted a listing");
  res.redirect("/listings");
};