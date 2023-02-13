const Article = require("../../models/article")
require('dotenv').config()

export default async function (req, res) {

    // if(title == "") return res.status(500).json({error:{message:"title is required"}})

    try {
        Article.deleteOne({_id:req.body._id},()=>{})
        let articles = await Article.find({}).lean()        
        res.status(200).json({success:{message:"Article Deleted Successfully"},articles})
    
    } catch (error) {
        
        res.status(200).json({error:{message:`Error:${error}`}})
    }
    
   

}
// write outline for ${input} ${promt}