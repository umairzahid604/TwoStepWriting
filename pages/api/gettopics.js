const Topic = require("../../models/topic")
require('dotenv').config()

export default async function (req, res) {
    let article = req.body.article
    try {
        let data = await Topic.find({article:article._id}).lean()
        res.status(200).json({success:{message:"Article Added Successfully"},topics:data})
    
    } catch (error) {
        
        res.status(200).json({error:{message:`Error:${error}`}})
    }
    
   

}
// write outline for ${input} ${promt}