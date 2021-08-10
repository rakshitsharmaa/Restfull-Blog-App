

var express=require("express"),
router=express.Router();
var Blog = require("../models/Blog");

router.get('/blogs/:id/edit',checkBlogOwnership,(req, res) => {
        Blog.findById(req.params.id,(err,findblog)=>{
        res.render("edit",{blog:findblog});
    });    
});

router.put('/blogs/:id',isLoggedIn, (req, res) => {
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

function checkBlogOwnership(req,res,next){
    var p=req;
    
    if(req.isAuthenticated()){
        Blog.findById(req.params.id,(err,findblog)=>{
            if(err){
                res.redirect("back");
            }else{
                if(findblog.author.id.equals(p.user._id)){
                    next();
                }else{
                    res.redirect("back");
                }
            }
        });
    }else{
        res.redirect("back");
    }
}
module.exports=router;