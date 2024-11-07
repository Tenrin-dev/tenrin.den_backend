const mongoose=require("mongoose")


const leadEmailSchema=mongoose.Schema({
    email:String
})

const leadEmailModel=mongoose.model("email",leadEmailSchema)

module.exports=leadEmailModel