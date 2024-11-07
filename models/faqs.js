const mongoose=require("mongoose")


const faqsSchema=mongoose.Schema({
    question:String,
    answer:String
})

const faqsModel=mongoose.model("faq",faqsSchema)

module.exports=faqsModel