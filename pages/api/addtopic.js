const Topic = require("../../models/topic")
require('dotenv').config()

export default async function (req, res) {
    console.log(req.body)    
    if(req.body.topic == "") return res.status(500).json({error:{message:"topic is required"}})

    try {
        let topic = await new Topic({article:req.body.article,topic:req.body.topic,para:""}).save()
        res.status(200).json({success:{message:"Topic Added Successfully"},topic:topic})
    
    } catch (error) {
        
        res.status(200).json({error:{message:`Error:${error}`}})
    }
    
   

}
// write outline for ${input} ${promt}