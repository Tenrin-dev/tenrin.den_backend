const express = require('express');
const { VerifyUser } = require('../../Middleware/UserAuth');
const { ViewFaqs, AddNewFaqs, DeleteFaqs } = require('../../Controllers/faqs');
const Route = express.Router();



// Route.get("/",(req,res)=>{
//     res.send("Graphic enpoint working fine")
// })

// Auth Endpoint
Route.get("/",ViewFaqs)

Route.post("/",VerifyUser,AddNewFaqs)

Route.delete("/:id",VerifyUser,DeleteFaqs)



module.exports = Route;