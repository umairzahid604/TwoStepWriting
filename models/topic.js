const mongoose = require("mongoose")
require("dotenv").config()
const db = require("../conn/database")

const TopicSchema = new mongoose.Schema({
    article:{
        type:String,
        required:true
    },
    
    topic:{
        type:String,
        required:true
    },
    para:{
        type:String,
    }
    
})
mongoose.models = {}

const Topic = new mongoose.model("topic",TopicSchema)

module.exports = Topic