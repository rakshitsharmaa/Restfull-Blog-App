

var express= require("express"),
router=express.Router();

// login routs
router.get('/login', (req, res) => {
    res.render("login");
});
router.post('/login',passport.authenticate("local",{successRedirect:"/blogs",failureRedirect: "/login"}), (req, res) => {
  
});


//logout routs
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect("/login");
});
module.exports=router;