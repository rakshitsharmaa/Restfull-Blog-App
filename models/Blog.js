var mongoose= require("mongoose"),
blogSchema=new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    author:{
        id:{
            type:mongoose.Schema.ObjectId,
            ref:"User"
        },
        username:String
    },
    created: {type: Date, default: Date.now}
});

module.exports=mongoose.model("Blog",blogSchema);