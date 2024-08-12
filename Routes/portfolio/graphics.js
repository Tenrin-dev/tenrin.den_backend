const express = require('express');
const { ViewGraphic, AddNewGraphic, DeleteGraphic } = require('../../Controllers/graphic');
const { VerifyUser } = require('../../Middleware/UserAuth');
const Route = express.Router();



// Route.get("/",(req,res)=>{
//     res.send("Graphic enpoint working fine")
// })

// Auth Endpoint
Route.get("/",ViewGraphic)

Route.post("/",VerifyUser,AddNewGraphic)

Route.delete("/:id",VerifyUser,DeleteGraphic)



module.exports = Route;