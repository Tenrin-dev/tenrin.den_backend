const graphicModel = require('../models/graphic');

const ViewGraphic = async(req,res)=>{    
    try{
        const response = await graphicModel.find()

        if(response)
        res.status(200).json({msg:"Data Sent",data:response})
        else
        res.status(404).json({msg:"data not found"})
        
    }catch(err){
        console.log("View Graphic issue",err)
        res.status(400).json({msg:'Got error to find Graphic'})
    }

}

const AddNewGraphic = async(req,res)=>{
    
    try{

      const {url,caption,width,height} = req.body;
     
     const data = new graphicModel( {url,caption,width,height})
    const response = await data.save();
    if(response){
       res.status(201).json({msg:"Graphic Inserted"}) 
    }    
    else{
        res.status(400).json({msg:"Graphic not inserted"})
    }
    }catch(err){
        if (err.code === 11000 || err.code === 11001) {
            const duplicatedKey = err.keyValue;
      
            // Send a response indicating the duplication error
            res.status(400).json({ message: 'Duplication error', duplicatedKey });
          }else{
              console.log("error in insetion Graphic",err)
              res.status(400).json({msg:"Error in Graphic insertion",error:err})     
            }
    }

}

const DeleteGraphic=async(req,res)=>{
    try{
        const id = req.params['id'];
        const response = await graphicModel.findOneAndDelete({_id:id})
        if(response)
        res.status(204).json({msg:"Graphic deleted"})
        else{
         res.status(404).json({msg:"Graphic not found"})
        }
    }catch(err){
        console.log("error in deleting Graphic",err)
        res.status(400).json({msg:"Error in Graphic deletion"})
    }
}



module.exports={ViewGraphic, AddNewGraphic, DeleteGraphic}
