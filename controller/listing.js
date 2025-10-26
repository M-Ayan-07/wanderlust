const Listing = require("../models/listing");

// Index route
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

// Search route - UPDATED with messages
module.exports.searchListings = async (req, res) => {
    const { category, destination } = req.query;
    
    let query = {};
    let message = "";
    
    // Search by category (from filter buttons)
    if (category) {
        query.category = category;
        message = `Showing results for "${category}"`;
    }
    
    // Search by destination (from search input)
    if (destination) {
        query.$or = [
            { location: { $regex: destination, $options: 'i' } },
            { country: { $regex: destination, $options: 'i' } },
            { title: { $regex: destination, $options: 'i' } }
        ];
        message = `Showing results for "${destination}"`;
    }
    
    // If no search parameters, redirect to all listings
    if (!category && !destination) {
        return res.redirect("/listings");
    }

    const allListings = await Listing.find(query);
    
    // If no listings found, update message
    if (allListings.length === 0) {
        if (category) {
            message = `No listings found for "${category}". Try another category!`;
        } else if (destination) {
            message = `No listings found for "${destination}". Try another location!`;
        }
        req.flash("error", message);
    } else {
        req.flash("success", message);
    }

    res.render("listings/index.ejs", { allListings });
};


// New Route
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

// Show route
module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: { path: "author" },
        })
        .populate("owner");
    
    if (!listing) {
        req.flash("error", "Cannot find that listing");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
};

// Create Route
module.exports.createListing = async (req, res, next) => {
    try {
        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        
        if (req.file) {
            let url = req.file.path;
            let filename = req.file.filename;
            newListing.image = { url, filename };
        } else {
            newListing.image = { 
                url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWwlMjByb29tfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
                filename: "default-listing-image" 
            };
        }
        
        await newListing.save();
        req.flash("success", "New Listing Created");
        res.redirect("/listings");
    } catch (error) {
        next(error);
    }
};

// Edit Route
module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    
    if (!listing) {
        req.flash("error", "Cannot find that listing");
        return res.redirect("/listings");
    }
    
    let OriginalImageUrl = listing.image.url;
    if (!OriginalImageUrl.includes('cloudinary')) {
        OriginalImageUrl = listing.image.url;
    } else {
        OriginalImageUrl = OriginalImageUrl.replace("/upload", "/upload/w_250");
    }
    
    res.render("listings/edit.ejs", { listing, OriginalImageUrl });
};

// Update Route
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    
    if (typeof req.file !== 'undefined') {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    
    req.flash("success", "Successfully updated listing");
    res.redirect(`/listings/${id}`);
};

// Delete Route
module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Successfully deleted listing");
    res.redirect("/listings");
};