const express = require('express');
const router = express.Router();
const Listing = require('../models/listing.js');
const wrapAsync = require("../utils/wrapAsync.js");  
const { isLoggedIn, isOwner,validateListing } = require('../middleware.js');
const  listingController  = require('../controller/listing.js');
const multer  = require('multer');  // For handling multipart/form-data, which is primarily used for uploading files
const { storage } = require('../cloudConfig.js'); // Import the configured Cloudinary storage
const upload = multer({ storage }); // Configure multer storage (you can customize this as needed)


//Index Route and Create Route
router.route("/")
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn,
        upload.single("listing[image]"), // Middleware to handle single file upload with field name 'image'
        validateListing,
        wrapAsync(listingController.createListing));

//New Route
router.get("/new",isLoggedIn,listingController.renderNewForm);


//Show, Update and Delete Route
router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn,
        isOwner,
        upload.single("listing[image]"), // Middleware to handle single file upload with field name 'image'
        validateListing,
        wrapAsync(listingController.updateListing))
    .delete(isLoggedIn,isOwner, wrapAsync(listingController.deleteListing));


//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));


module.exports = router;