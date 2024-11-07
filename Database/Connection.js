const mongoose=require("mongoose")

const Db=()=>{
    
    mongoose.connect("mongodb+srv://tenrindev:Sara995sen~@tenrindev.ctzsp.mongodb.net/portfolio").then(()=>{
        console.log("Database connection established")
    }).catch((err)=>{
        console.log("Database is not established")
        console.log(err)
    })
}

module.exports=Db