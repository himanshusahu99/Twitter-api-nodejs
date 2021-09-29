const mongoose = require("mongoose"); 

mongoose.connect("mongodb://localhost:27017/twitter", {
     useNewUrlParser : true, 
     useUnifiedTopology: true, 
     
}).then(()=>{console.log("connection success")}).catch((e)=>{console.log("no connection", e
)});

// mongoose.connection.once('open', ()=>{
//      console.log("connected to mongoDB");
// })

// module.exports = mongoose.connection;
