const express = require('express');
const jwt = require("jsonwebtoken");  
const MongoStore = require('connect-mongo').default;
const {JWT_SECRET} = require('../config/keys')
const requiredlogin = require("../middleware/requiredlogin")
const router = new express.Router(); 
const  Register = require("../models/user")
const  Post = require("../models/post")





router.post("/createpost",requiredlogin, async (req, res)=>{

    
     try{
               const newpost = new Post({
                    tweet:req.body.tweet, 
                    postedBy:{...req.user}
               })

               // console.log(req.user)

               const result = await newpost.save(); 
               res.status(201).send("post created"); 



     } catch(e) { res.send(e)}


})

router.get("/allpost", async (req , res)=>{

     try {   
          const tweets = await Post.find() 

          res.send(tweets); 

     }
     catch(e){res.send(e)}

})

router.get("/mypost", requiredlogin, (req, res)=>{
     Post.find({postedBy : req.user._id})
     .then(mypost =>{res.json({mypost})    })
     .catch(e =>{res.send(e)})
})

router.delete("/deletepost/:id",requiredlogin, async (req, res)=>{

     try{          
          const _id = req.params.id;
          // console.log(_id)
          const findPost = await Post.findById({_id});
          // console.log(findPost)
          const post = Post.findById(_id);
          // console.log("this is user " + req.user._id + " this is post " +  findPost._id)
          if(findPost.postedBy.toString() == req.user._id.toString()){

          // if(post._id === )
          const deletedPost = await Post.findByIdAndDelete(_id);
     } else return res.send("you  cant delete others post") 

          if(!_id){
               return res.status(400).send("wrond id"); 
          }
          res.status(200).send("deleted")
     }
     catch(e){
          res.status(500).send(e);
     }
     
})

router.patch("/follow", requiredlogin, async (req, res)=>{

     const follower = req.body.following;
     // console.log("this is follower " + follower)


     //add following
     // const result = await Register.findByIdAndUpdate(req.user._id, req.body, {new:true})
     const result = await Register.findByIdAndUpdate( {_id : req.user._id}, { $push: {following : req.body.following}} , {new:true})

     //adding follwers
     // console.log(follower)
     const _id = follower
     const findUser = await Register.findById({_id}); 
     // console.log( "this is me ",  findUser.firstname, findUser._id);
     const newresult = await Register.findByIdAndUpdate( {_id : findUser._id}, { $push: {followers : req.user._id}} , {new:true})
     // console.log( "this is me ",  findUser);
     res.send("updated")
})

router.patch("/unfollow", requiredlogin, async (req, res)=>{

     try {
     const follower = req.body.following;
     // console.log("this is follower " + follower)
     //removin from the current user following data
     const foll = await Register.findByIdAndUpdate({_id:req.user._id}, { $pull : {following: follower}}, {new : true})
     
     //removing from the follewers data
     const followerRem = await Register.findByIdAndUpdate({_id:follower}, { $pull : {followers: req.user._id}}, {new : true})
     res.send("ok")
     }
     catch(e) { res.send(e)}

})


router.patch("/like",requiredlogin, async(req, res)=>{

     try{
          const postid = req.body.postid;
          // console.log(postid)
          const result = await Post.findByIdAndUpdate( {_id : postid}, { $push: {like : req.user._id}} , {new:true})
          res.send("liked"); 
     }
     catch (e) {res.send(e)}
})

router.patch("/unlike",requiredlogin, async(req, res)=>{

     try{
          const postid = req.body.postid;
          // console.log(postid)
          const result = await Post.findByIdAndUpdate( {_id : postid}, { $pull: {like : req.user._id}} , {new:true})
          res.send("Unliked"); 
     }
     catch (e) {res.send(e)}
})

router.patch("/comment",requiredlogin, async(req, res)=>{

     try{
          const comment = {
               text: req.body.comment, 
               postedBy: req.user._id
               
          }
          const postid = req.body.postid
          // console.log(postid)
          const result = await Post.findByIdAndUpdate( {_id : postid}, { $push: {comments : comment}} , {new:true})
          res.send("comment Posted"); 
     }
     catch (e) {res.send(e)}
})



router.get("/alluser", async (req, res)=>{

      try {

          

          const tweets = await Register.find() 

          res.send(tweets); 

     }
     catch(e){res.send(e)}

})

module.exports = router; 