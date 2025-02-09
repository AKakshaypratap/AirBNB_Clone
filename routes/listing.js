const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");


const validateListing = (req,res,next) => {
    let {error} = listingSchema.validate(req.body);   
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",")
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
} 

// index route
router.get("/", wrapAsync(async (req,res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", {allListings});
}));

//new route (new and create)
router.get("/new", wrapAsync((req,res) => {
    res.render("./listings/new.ejs")
}));

//create route
router.post("/", validateListing, wrapAsync(async(req,res,next) => {
    // let {title, desription, image, price, location, country} = req.body;
    // let newlisting = req.body.listing   
        // if(!req.body.listing){
        //     throw new ExpressError(400,"Send valid data for listing");
        // }
        // let result = listingSchema.validate(req.body);
        // console.log(result);
        // if(result.error){
        //     throw new ExpressError(400, result.error);
        // }
        const newListing = new Listing(req.body.listing);           
        await newListing.save();
        req.flash("success","New Listing Created");
        res.redirect("/listings");   
}));
// show route
router.get("/:id", wrapAsync(async(req, res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if(!listing){
        req.flash("error", "listing you requested, does not exist");
        res.redirect("/listings");
    }
    res.render("./listings/show.ejs", {listing});
}));

//edit route
router.get("/:id/edit", wrapAsync(async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "listing you requested, does not exist");
        res.redirect("/listings");
    }
    res.render("./listings/edit.ejs", {listing});
}));

//update route
router.put("/:id", validateListing, wrapAsync(async(req,res) => {
    // if(!req.body.listing){
    //     throw new ExpressError(400,"Send valid data for listing");
    // }
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing})
    req.flash("success","listing updated");
    res.redirect(`/listings/${id}`);
}));

//delete route
router.delete("/:id", wrapAsync(async (req,res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","listing deleted");
    res.redirect("/listings");
}));

module.exports = router;