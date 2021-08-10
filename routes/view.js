var express=require("express"),
router=express.Router();
var Blog=require("../models/Blog");
router.get("/blogs/:id",(req, res) => {
    Blog.findById(req.params.id,(err,foundBlog)=>{
         if(err){
             res.redirect("/blog");
         }else{
             res.render("show",{blog:foundBlog});
         }
    })
 });
module.exports=router;