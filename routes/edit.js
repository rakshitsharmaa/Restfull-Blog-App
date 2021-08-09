

var express=require("express"),
router=express.Router();
var Blog = require("../models/Blog");

router.get('/blogs/:id/edit', isLoggedIn,(req, res) => {
    Blog.findById(req.params.id,(err,findblog)=>{
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("edit",{blog:findblog});
        }
    })
});

router.put('/blogs/:id', (req, res) => {
    req.body.blog.body=req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs/"+req.params.id);
        }
    })
});
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
     res.redirect("/login");
}

module.exports=router;