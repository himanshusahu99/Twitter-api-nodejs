const express = require('express');
const app = express();
require("./db/conn");
app.use(express.json())


const postRouter = require("./routers/post")
const userRouter = require("./routers/user")


app.use(postRouter) 
app.use(userRouter)


const port  = process.env.PORT || 5000; 

app.listen(port, ()=>{console.log(`listeing ar ${port}`)})