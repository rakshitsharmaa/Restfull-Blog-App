var express=require("express"),
app=express(),
methodOverride=require("method-override"),
mongoose=require("mongoose"),
bodyparser=require("body-parser");
localstrategy=require("passport-local");
passport = require("passport");
expressSanitizer=require("express-sanitizer"),
Blog=require("./models/Blog"),
User=require("./models/User");
Blog=require("./routes/blog");
LogIn=require("./routes/login");
edit=require("./routes/edit");
view=require("./routes/view");
register=require("./routes/register");
deletes=require("./routes/delete");

mongoose.connect("mongodb://localhost:27017/restful_blog_p",
                {useNewUrlParser: true,
                useUnifiedTopology: true});

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

app.use(require("express-session")({
    secret:"stiev is fool",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
    res.locals.currentUser=req.user
    next();
})

app.use(Blog);
app.use(LogIn);
app.use(view);
app.use(edit);
app.use(register);
app.use(deletes);
app.listen(process.env.PORT||3000,function(){
    console.log("server is running");
})