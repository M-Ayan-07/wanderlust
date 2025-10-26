const joi = require("joi");

module.exports.listingSchema = joi.object({
    listing : joi.object({
        title :joi.string().required(),
        description :joi.string().required(),
        location :joi.string().required(),
        country :joi.string().required(),
        price:joi.number().required().min(0),
        category: joi.string().valid(
            'Trending', 'Rooms', 'Mountains', 'Beach', 'Nearby', 
            'Castles', 'Cabins', 'Camping', 'National parks', 
            'Farms', 'Unique stays'
        ).required(), // ADD THIS LINE
        image:joi.string().allow("",null),
    }).required()
});

module.exports.reviewSchema = joi.object({
    review : joi.object({
        rating :joi.number().required().min(1).max(5),
        comment :joi.string().required(),
    }).required()
});