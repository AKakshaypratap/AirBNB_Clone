const express = require("express");
const router = express.Router();


//index route - posts
router.get("/",(req,res) => {
    res.send("GET for posts");
});
//show route - posts
router.get("/:id",(req,res) =>{
    res.send("GET for post id");
});
//post route - posts
router.post("/",(req,res) =>{
    res.send("post for posts");
})
//delete route - posts
router.delete("/:id",(req,res) =>{
    res.send("DELETE for posts id");
})

module.exports = router;