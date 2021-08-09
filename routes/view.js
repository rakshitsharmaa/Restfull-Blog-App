var express=require("express"),
router=express.Router();
var Blog=require("../models/Blog");
router.get("/blogs/:id", isLoggedIn,(req, res) => {
    Blog.findById(req.params.id,(err,foundBlog)=>{
         if(err){
             res.redirect("/blog");
         }else{
             res.render("show",{blog:foundBlog});
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