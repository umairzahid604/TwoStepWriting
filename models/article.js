const mongoose = require("mongoose")
require("dotenv").config()
const db = require("../conn/database")

const ArticleSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    intro:{
        type:String,
    }
    
})

mongoose.models = {}

const Article = new mongoose.model("articles",ArticleSchema)

module.exports = Article