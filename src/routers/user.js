const express = require('express');
const jwt = require("jsonwebtoken");  
const MongoStore = require('connect-mongo').default;
const {JWT_SECRET} = require('../config/keys')
const requiredlogin = require("../middleware/requiredlogin")
const router = new express.Router(); 
const  Register = require("../models/user")
const  Post = require("../models/post")


router.get("/", (req, res) => {
     res.send("Welcomw to twitter API")
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
          res.status(201).send(`registered Sccueccssfully your token is ${token}`)
     }
     catch(e){
          res.status(400).send(e)
     }

})

router.get("/pr", requiredlogin,  (req, res)=>{res.send("this is pro")})

router.post("/login",  async (req,res )=>{

     try {

          const email  = req.body.email; 
          const password = req.body.password; 

          const userEmail = await Register.findOne({email:email});
          
          if(userEmail.password === password) 
          {   
               //console.log(token);

               return  res.status(200).send("logined successfully"); 
     
           }
          else {return res.status(400).send("invalid email or password ");}  

     }
     catch(e){
          res.status(400).send("invalid email or password" + e)

     }


})


module.exports = router; 