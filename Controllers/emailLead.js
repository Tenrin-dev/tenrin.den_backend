const leadEmailModel = require("../models/leadEmail")
const { Parser } = require('json2csv');
// import slugify from "slugify";


const ViewleadEmail = async(req,res)=>{    
    try{
        const response = await leadEmailModel.find()

        if(response)
        res.status(200).json({msg:"Data Sent",data:response.reverse()})
        else
        res.status(404).json({msg:"data not found"})
        
    }catch(err){
        console.log("View blog issue",err)
        res.status(400).json({msg:'Got error to find blog'})
    }

}

const GenerateCsv = async(req,res)=>{    
    try{
        const jsonData = await leadEmailModel.find();

        if (!jsonData || jsonData.length<1) {
            return res.status(400).send('No JSON data provided');
          }
        
          const fields = [
            'id','email'
          ];
        
          const enhancedJsonData = jsonData.map(item => {
            return {
              id:item._id,
              email:item.email
            };
          });
        
        
          // Parse the JSON to CSV
          const json2csvParser = new Parser({ fields });
          let csv = json2csvParser.parse(enhancedJsonData);
        
          const bom = '\ufeff';
          csv = bom + csv;
        
          // Save CSV to a file (optional)
        //   const filePath = path.join(__dirname, 'data.csv');
        //   await fs.writeFile(filePath, csv, 'utf8');
        
          // Send CSV file as response
          res.header('Content-Type', 'text/csv');
          res.attachment('data.csv');
          return res.send(csv);
        
    }catch(err){
        console.log("csv file issue",err)
        res.status(400).json({msg:'Got error to find csv'})
    }

}

const AddNewleadEmail = async(req,res)=>{
    
    try{

      const {email} = req.body;
     const data = new leadEmailModel({email})
    const response = await data.save();
    if(response){
       res.status(201).json({msg:"leadEmail Inserted"}) 
    }    
    else{
        res.status(400).json({msg:"leadEmail not inserted"})
    }
    }catch(err){
        if (err.code === 11000 || err.code === 11001) {
            const duplicatedKey = err.keyValue;
      
            // Send a response indicating the duplication error
            res.status(400).json({ message: 'Duplication error', duplicatedKey });
          }else{
              console.log("error in insetion leadEmail",err)
              res.status(400).json({msg:"Error in leadEmail insertion",error:err})     
            }
    }

}

const DeleteleadEmail=async(req,res)=>{
    try{
        const id = req.params['id'];
        const response = await leadEmailModel.findOneAndDelete({_id:id})
        if(response)
        res.status(204).json({msg:"leadEmail deleted"})
        else{
         res.status(404).json({msg:"leadEmail not found"})
        }
    }catch(err){
        console.log("error in deleting blog",err)
        res.status(400).json({msg:"Error in leadEmail deletion"})
    }
}



module.exports={ ViewleadEmail, AddNewleadEmail, DeleteleadEmail, GenerateCsv}
