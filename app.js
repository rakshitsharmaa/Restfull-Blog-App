


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

mongoose.connect("mongodb://localhost:27017/restful_blog_ap",
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
// Blog.create({
//     title:"New Blog",
//     image:"https://static.toiimg.com/photo/53209691.cms",
//     body:"it is a fantastic blog"
// })
app.get('/blogs', (req, res) => {
    
    Blog.find({},function(err,blogs){
        if(err){
            console.log("error");
        }else{
            res.render("index",{blogs:blogs});
        }
    });
});
app.get('/', (req, res) => {
    
    res.redirect("/blogs");
});

app.get('/blogs/new', (req, res) => {
    res.render("new");
});
app.post('/blogs', (req, res) => {
    req.body.blog.body=req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog,function(err,newBlog){
        if(err){
            res.render("new");
        }else{
            res.redirect("/blogs");
        }
    })
});
app.get("/blogs/:id", (req, res) => {
   Blog.findById(req.params.id,(err,foundBlog)=>{
        if(err){
            res.redirect("/blog");
        }else{
            res.render("show",{blog:foundBlog});
        }
   })
});
app.get('/blogs/:id/edit', (req, res) => {
    Blog.findById(req.params.id,(err,findblog)=>{
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("edit",{blog:findblog});
        }
    })
});
app.put('/blogs/:id', (req, res) => {
    req.body.blog.body=req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs/"+req.params.id);
        }
    })
});
app.delete('/blogs/:id', (req, res) => {
    Blog.findByIdAndRemove(req.params.id,function(err){
        res.redirect("/blogs");
    })
});


app.get('/register', (req, res) => {
    res.render("register");
});
app.post('/register', (req, res) => {
    var newUser= new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log("err");
            return res.render("register");

        }else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("/blogs");
            });
        }
    });
});
app.listen(process.env.PORT||3000,function(){
    console.log("server is running");
})