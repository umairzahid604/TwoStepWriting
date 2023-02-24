const Article = require("../../models/article")
require('dotenv').config()

export default async function (req, res) {
    let articles = req.body.articles
    articles = articles.filter(article => article != null)
    console.log(articles)
    // if(title == "") return res.status(500).json({error:{message:"title is required"}})

    try {
        await Article.insertMany(articles).then(()=> {})
        let articles2 = await Article.find({}).lean()
        res.status(200).json({success:{message:"Article Added Successfully"},articles:articles2})
    
    } catch (error) {
        
        res.status(200).json({error:{message:`Error:${error}`}})
    }
    
   

}
// write outline for ${input} ${promt}