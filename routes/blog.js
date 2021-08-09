var express=require("express"),
router=express.Router();
var Blog = require("../models/Blog");


router.get('/blogs',isLoggedIn, (req, res) => {
    
    Blog.find({},function(err,blogs){
        if(err){
            console.log("error");
        }else{
            res.render("index",{blogs:blogs});
        }
    });
});
router.get('/',isLoggedIn, (req, res) => {
    
    res.redirect("/blogs");
});

router.get('/blogs/new',isLoggedIn, (req, res) => {
    res.render("new");
});
router.post('/blogs', (req, res) => {
    req.body.blog.body=req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog,function(err,newBlog){
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