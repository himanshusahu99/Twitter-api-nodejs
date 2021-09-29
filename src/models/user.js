const   mongoose =  require("mongoose"); 
const {ObjectId} = mongoose.Schema.Types
const schema = new mongoose.Schema({

     firstname: {
          type:String, 
          required: true, 
          minLength:4, 

     }, 
     
     lastname: {
          type:String, 
          required: true, 
          minLength:4, 

     }, 
     
     email: {
          type:String, 
          required: true, 
          unique: true,  

     }, 
     
     password:{
          type: String,
          required: true, 
          

     },

     phone : {
          type: Number, 
          required: true, 
          unique:true 
     },

     followers:[{type: ObjectId, ref: "user"}], 
     following:[{type: ObjectId, ref: "user"}], 


     
     

})

const Register = new mongoose.model("Register", schema);
module.exports = Register ;