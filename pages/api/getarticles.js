const Article = require("../../models/article")
require('dotenv').config()

export default async function (req, res) {

    try {
        let data = await Article.find({}).lean()
        res.status(200).json({success:{message:"Article Added Successfully"},articles:data})
    
    } catch (error) {
        
        res.status(200).json({error:{message:`Error:${error}`}})
    }
    
   

}
// write outline for ${input} ${promt}