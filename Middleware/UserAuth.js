const registerModel = require('../models/register');
const jwt = require('jsonwebtoken')


const VerifyUser = async(req,res,next)=>{
    try{
        const {jwt:token} = req.cookies;
        if(!token){  
            res.status(403).json({msg:"UnAuthorized"})
        }
            const {id} = await jwt.verify(token,"process.env.SECRETKEY123");
            const foundUser = await registerModel.findOne({_id:id})
            if(!foundUser){
                res.status(403).json({msg:"Unauthorized"})
            }
            else{
                next()
            }              
        
    }catch(err){
        console.log("Error in User Verification ",err)
    }
}

module.exports = {VerifyUser} 