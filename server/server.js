const express = require("express")
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const app = express()


//connect
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(() => console.log("Connect to mongodb success"))
.catch((err)=>console.log(err))


app.listen(5000, () => {
    console.log("Server is running ")
})