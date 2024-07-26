const mongoose=require("mongoose")

const Db=()=>{
    
    mongoose.connect("mongodb://127.0.0.1:27017/cryptowallet").then(()=>{
        console.log("Database connection established")
    }).catch((err)=>{
        console.log("Database is not established")
        console.log(err)
    })
}

module.exports=Db