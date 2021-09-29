const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/keys')
const mongoose = require('mongoose')
const Register =require("../models/user")
module.exports = (req,res,next)=>{
    const {authorization} = req.headers
    //authorization === Bearer ewefwegwrherhe
    if(!authorization){
       return res.status(401).json({error:"you must use Bearer authorization token to use"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
         return   res.status(401).json({error:"you must use Bearer authorization token to use"})
        }

        const {_id} = payload
        Register.findById(_id).then(userdata=>{
            req.user = userdata
            next()
        })
        
        
    })
}