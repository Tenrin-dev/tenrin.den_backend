const videoModel = require('../models/video');

const ViewVideo = async(req,res)=>{    
    try{
        const response = await videoModel.find()

        if(response)
        res.status(200).json({msg:"Data Sent",data:response.reverse()})
        else
        res.status(404).json({msg:"data not found"})
        
    }catch(err){
        console.log("View blog issue",err)
        res.status(400).json({msg:'Got error to find blog'})
    }

}

const AddNewVideo = async(req,res)=>{
    
    try{

      const {url,poster,description} = req.body;
     console.log("hello", req.body)
     const data = new videoModel( {url,poster,description})
    const response = await data.save();
    if(response){
       res.status(201).json({msg:"Video Inserted"}) 
    }    
    else{
        res.status(400).json({msg:"Video not inserted"})
    }
    }catch(err){
        if (err.code === 11000 || err.code === 11001) {
            const duplicatedKey = err.keyValue;
      
            // Send a response indicating the duplication error
            res.status(400).json({ message: 'Duplication error', duplicatedKey });
          }else{
              console.log("error in insetion Video",err)
              res.status(400).json({msg:"Error in Video insertion",error:err})     
            }
    }

}

const DeleteVideo=async(req,res)=>{
    try{
        const id = req.params['id'];
        const response = await videoModel.findOneAndDelete({_id:id})
        if(response)
        res.status(204).json({msg:"Video deleted"})
        else{
         res.status(404).json({msg:"Video not found"})
        }
    }catch(err){
        console.log("error in deleting blog",err)
        res.status(400).json({msg:"Error in Video deletion"})
    }
}



module.exports={ViewVideo, AddNewVideo, DeleteVideo}
