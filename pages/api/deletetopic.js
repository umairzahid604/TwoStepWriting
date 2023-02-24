const Topic = require("../../models/topic")
require('dotenv').config()

export default async function (req, res) {

    // if(title == "") return res.status(500).json({error:{message:"title is required"}})

    try {
        Topic.deleteOne({_id:req.body._id},()=>{})
        let topics = await Article.find({}).lean()        
        res.status(200).json({success:{message:"Article Deleted Successfully"},topics})
    
    } catch (error) {
        
        res.status(200).json({error:{message:`Error:${error}`}})
    }
    
   

}
// write outline for ${input} ${promt}