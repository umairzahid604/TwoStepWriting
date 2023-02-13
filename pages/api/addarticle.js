const Article = require("../../models/article")
require('dotenv').config()

export default async function (req, res) {
    let {title} = req.body
    if(title == "") return res.status(500).json({error:{message:"title is required"}})

    try {
       let article = await new Article({title:title,intro:""}).save()
        
        res.status(200).json({success:{message:"Article Added Successfully"},article:article})
    
    } catch (error) {
        
        res.status(200).json({error:{message:`Error:${error}`}})
    }
    
   

}
// write outline for ${input} ${promt}