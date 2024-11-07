const express = require('express');
const { VerifyUser } = require('../../Middleware/UserAuth');
const { ViewleadEmail, AddNewleadEmail, DeleteleadEmail, GenerateCsv } = require('../../Controllers/emailLead');
const Route = express.Router();



// Route.get("/",(req,res)=>{
//     res.send("Graphic enpoint working fine")
// })

// Auth Endpoint
Route.get("/",ViewleadEmail)
Route.get("/csv",VerifyUser,GenerateCsv)

Route.post("/",AddNewleadEmail)

Route.delete("/:id",VerifyUser,DeleteleadEmail)



module.exports = Route;