var Blog= require("../models/Blog");
var middlewareObj={};
middlewareObj.checkBlogOwnership=function(req,res,next){
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
middlewareObj.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","please login first");
    
     res.redirect("/login");
}
module.exports=middlewareObj;