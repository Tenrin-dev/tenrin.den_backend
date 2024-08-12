const express = require('express');
const { ViewVideo, AddNewVideo, DeleteVideo } = require('../../Controllers/videos');
const { VerifyUser } = require('../../Middleware/UserAuth');
const Route = express.Router();



// Route.get("/",(req,res)=>{
//     res.send("video enpoint working fine")
// })

// Auth Endpoint
Route.get("/",ViewVideo)

Route.post("/",VerifyUser,AddNewVideo)

Route.delete("/:id",VerifyUser,DeleteVideo)



module.exports = Route;