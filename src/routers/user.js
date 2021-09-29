const express = require('express');
const jwt = require("jsonwebtoken");  
const MongoStore = require('connect-mongo').default;
const {JWT_SECRET} = require('../config/keys')
const requiredlogin = require("../middleware/requiredlogin")
const router = new express.Router(); 
const  Register = require("../models/user")
const  Post = require("../models/post")


router.get("/", (req, res) => {
     res.send("Welcome to twitter API")
})

router.post("/register", async (req, res)=>{
     try {
          const registerUser = new Register({
               firstname: req.body.firstname, 
               lastname: req.body.lastname, 
               email: req.body.email, 
               password: req.body.password, 
               phone: req.body.phone
          })

          curruser = registerUser; 
          const token = jwt.sign({_id : registerUser._id } , JWT_SECRET)

          const result = await registerUser.save(); 
          res.status(201).json({"success" : "registered successfully", "token": token} )
     }
     catch(e){
          // res.status(400).send()
          if(e.keyValue.email == req.body.email)
               res.status(400).json({"error": "email number already registered"})
          if(e.keyValue.phone == req.body.phone)
               res.status(400).json({"error": "phone number already registered"})
     }

})

router.get("/pr", requiredlogin,  (req, res)=>{res.send("this is pro")})

router.get("/login",  async (req,res )=>{

     try {

          const email  = req.body.email; 
          const password = req.body.password; 
          console.log(password);

          const userEmail = await Register.findOne({email:email});
         
          if(userEmail.password === password) 
          {   
               //console.log(token);

               return  res.status(200).json({"success": "logined successfully"}); 
     
           }
          else {return res.status(400).json({"error":"invalid email or password "});}  

     }
     catch(e){
          res.status(422).send({"error":"invalid email or password "})

     }


})


module.exports = router; 