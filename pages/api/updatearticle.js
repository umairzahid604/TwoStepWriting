const Article = require("../../models/article")
require('dotenv').config()

export default async function (req, res) {
    let article = req.body.article

    try {
       let article = await Article.updateOne({title:title,intro:""}).save()
        
        res.status(200).json({success:{message:"Article Added Successfully"},article:article})
    
    } catch (error) {
        
        res.status(200).json({error:{message:`Error:${error}`}})
    }
    
   

}
// write outline for ${input} ${promt}