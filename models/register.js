const mongoose=require("mongoose")


const registerSchema=mongoose.Schema({

    name:String,
    email:String,
    phone:String,
    password:String,
    token:[String]
})

const registerModel=mongoose.model("register",registerSchema)

module.exports=registerModel