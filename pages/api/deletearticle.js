const Article = require("../../models/article")
const Topic = require("../../models/topic")

require('dotenv').config()

export default async function (req, res) {

    // if(title == "") return res.status(500).json({error:{message:"title is required"}})
    console.log("id"+req.body._id)
    try {
        let a =  await Topic.deleteMany({article:req.body._id})
        console.log(a)
        await Article.deleteOne({_id:req.body._id},()=>{})
        let articles = await Article.find({}).lean()        
        res.status(200).json({success:{message:"Article Deleted Successfully"},articles})
    
    } catch (error) {
        
        res.status(200).json({error:{message:`Error:${error}`}})
    }
    
   

}
// write outline for ${input} ${promt}