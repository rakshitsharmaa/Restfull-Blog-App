var express=require("express"),
router=express.Router();
var Blog=require("../models/Blog");

router.delete('/blogs/:id', (req, res) => {
    Blog.findByIdAndRemove(req.params.id,function(err){
        res.redirect("/blogs");
    })
});




module.exports=router;