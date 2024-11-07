const mongoose=require("mongoose")


const graphicSchema=mongoose.Schema({
    url:String,
    caption:String,
    width:String,
    height:String
})

const graphicModel=mongoose.model("graphic",graphicSchema)

module.exports=graphicModel