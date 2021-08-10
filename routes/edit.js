

var express=require("express"),
router=express.Router();
var Blog = require("../models/Blog");
var middleware= require("../middleware");

router.get('/blogs/:id/edit',middleware.checkBlogOwnership,(req, res) => {
        Blog.findById(req.params.id,(err,findblog)=>{
        res.render("edit",{blog:findblog});
    });    
});

router.put('/blogs/:id',middleware.checkBlogOwnership, (req, res) => {
    req.body.blog.body=req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs/"+req.params.id);
        }
    })
});
module.exports=router;