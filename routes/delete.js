var express=require("express"),
router=express.Router();
var Blog=require("../models/Blog");

router.delete('/blogs/:id',checkBlogOwnership, (req, res) => {
    Blog.findByIdAndRemove(req.params.id,function(err){
        res.redirect("/blogs");
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