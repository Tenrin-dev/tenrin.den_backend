const express = require('express')
const Route = express.Router();

// controller
const {Register,Login,UpdateProfile,Logout, GetAllUser, RefreshUser} = require("../../Controllers/Auth");
const { VerifyUser } = require('../../Middleware/UserAuth');

Route.get("/",(req,res)=>{
    res.send("User enpoint working fine")
})

// Auth Endpoint

Route.post("/login",Login)
Route.post("/register",Register)
Route.patch("/register/:id",VerifyUser,UpdateProfile);
Route.post("/logout",VerifyUser,Logout)
Route.get("/alluser",VerifyUser,GetAllUser)
Route.get("/refresh",VerifyUser,RefreshUser)


module.exports = Route;