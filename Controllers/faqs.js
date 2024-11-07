const faqsModel = require("../models/faqs")

const ViewFaqs = async(req,res)=>{    
    try{
        const response = await faqsModel.find()

        if(response)
        res.status(200).json({msg:"Data Sent",data:response})
        else
        res.status(404).json({msg:"data not found"})
        
    }catch(err){
        console.log("View blog issue",err)
        res.status(400).json({msg:'Got error to find blog'})
    }

}

const AddNewFaqs = async(req,res)=>{
    
    try{

      const {question,answer} = req.body;
     console.log("hello", req.body)
     const data = new faqsModel( {question,answer})
    const response = await data.save();
    if(response){
       res.status(201).json({msg:"Faqs Inserted"}) 
    }    
    else{
        res.status(400).json({msg:"Faqs not inserted"})
    }
    }catch(err){
        if (err.code === 11000 || err.code === 11001) {
            const duplicatedKey = err.keyValue;
      
            // Send a response indicating the duplication error
            res.status(400).json({ message: 'Duplication error', duplicatedKey });
          }else{
              console.log("error in insetion Faqs",err)
              res.status(400).json({msg:"Error in Faqs insertion",error:err})     
            }
    }

}

const DeleteFaqs=async(req,res)=>{
    try{
        const id = req.params['id'];
        const response = await faqsModel.findOneAndDelete({_id:id})
        if(response)
        res.status(204).json({msg:"Faqs deleted"})
        else{
         res.status(404).json({msg:"Faqs not found"})
        }
    }catch(err){
        console.log("error in deleting blog",err)
        res.status(400).json({msg:"Error in Faqs deletion"})
    }
}



module.exports={ ViewFaqs, AddNewFaqs, DeleteFaqs}
