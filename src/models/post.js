const   mongoose =  require("mongoose"); 
const {ObjectId} = mongoose.Schema.Types
const schema = new mongoose.Schema({

     tweet: {
          type:String, 
          required: true, 
          maxLength:140, 

     }, 
     
     like: [{type:ObjectId, ref:"user"}], 
     comments: [{
          text:String, postedBy: {type: ObjectId, ref:"user"}}], 

     postedBy : {
          type: ObjectId, 
          ref: "user"
     }
     

})

const Post = new mongoose.model("Post", schema);
module.exports = Post ;