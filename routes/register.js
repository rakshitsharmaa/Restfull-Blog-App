


var express=require("express"),
router=express.Router();
var User=require("../models/User");
var passport=require("passport");

//registeration routs
router.get('/register', (req, res) => {
    res.render("register");
});
router.post('/register', (req, res) => {
    var i=req;
    var newUser= new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log("err");
            i.flash("error",err.message)
            return res.redirect("/register");

        }else{
            passport.authenticate("local")(req,res,function(){
                i.flash("success","registed successfully "+user.username);
                res.redirect("/blogs");
            });
        }
    });
});

module.exports=router;