const mongoose=require("mongoose")


const videoSchema=mongoose.Schema({
    url:String,
    poster:String,
    description:String
})

const videoModel=mongoose.model("video",videoSchema)

module.exports=videoModel