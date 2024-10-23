const mongoose = require("mongoose");
const review = require("./review");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        type: String,
        default: "https://unsplash.com/photos/scenic-night-view-of-las-americas-boulevard-in-tenerife-canary-island-spain-GOXpXg8QjTo",
        set: (v) => v === "" ? "https://unsplash.com/photos/scenic-night-view-of-las-americas-boulevard-in-tenerife-canary-island-spain-GOXpXg8QjTo" : v,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review",
    }]
});

listingSchema.post("findOneAndDelete", async(listing) =>{
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;