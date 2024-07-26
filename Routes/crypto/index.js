const express = require('express');
const { CoinHistory } = require('../../Controllers/crypto');
const Route = express.Router();



Route.get("/",(req,res)=>{
    res.send("crypto enpoint working fine")
})

// Auth Endpoint

Route.post("/coins/:id/market_chart/range",CoinHistory)


module.exports = Route;