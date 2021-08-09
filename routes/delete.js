var express=require("express"),
router=express.Router();
var Blog=require("../models/Blog");

router.delete('/blogs/:id',isLoggedIn, (req, res) => {
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



module.exports=router;