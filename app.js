var express=require("express"),
app=express(),
methodOverride=require("method-override"),
mongoose=require("mongoose"),
bodyparser=require("body-parser");
expressSanitizer=require("express-sanitizer"),

// mongoose.connect("mongodb://localhost:27017/restful_blog_app",
//                 {useNewUrlParser: true,
//                 useUnifiedTopology: true});
mongoose.connect("mongodb+srv://rakshitsharmaa:Oxl1ool1or1o@@cluster0.wnv6s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{useNewUrlParser: true,
                 useUnifiedTopology: true});
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

var blogSchema=new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog=mongoose.model("Blog",blogSchema);
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
app.listen(process.env.PORT,function(){
    console.log("server is running");
})