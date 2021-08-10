var express=require("express"),
router=express.Router();
var middleware =require("../middleware");
var Blog=require("../models/Blog");

router.delete('/blogs/:id',middleware.checkBlogOwnership, (req, res) => {
    Blog.findByIdAndRemove(req.params.id,function(err){
        res.redirect("/blogs");
    })
});
module.exports=router;