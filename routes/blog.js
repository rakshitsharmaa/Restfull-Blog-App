var express=require("express"),
router=express.Router();
var Blog = require("../models/Blog");


router.get('/blogs', (req, res) => {
    
    Blog.find({},function(err,blogs){
        if(err){
            console.log("error");
        }else{
            res.render("index",{blogs:blogs});
        }
    });
});
router.get('/', (req, res) => {
    
    res.redirect("/blogs");
});

router.get('/blogs/new',isLoggedIn, (req, res) => {
    res.render("new");
});
router.post('/blogs',isLoggedIn ,(req, res) => {
   
    req.body.blog.body=req.sanitize(req.body.blog.body);
    var author={
        id:req.user._id,
        username:req.user.username
    }
    var newBlogs={title:req.body.blog.title,
         image:req.body.blog.image,
         body:req.body.blog.body
        ,author:author}
    Blog.create(newBlogs,function(err,newBlog){
        if(err){
            res.render("new");
        }else{
            res.redirect("/blogs");
        }
    })
});
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect("/login");
});
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
     res.redirect("/login");
}
module.exports=router;