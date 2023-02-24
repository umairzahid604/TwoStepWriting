const Topic = require("../../models/topic")
require('dotenv').config()

export default async function (req, res) {
    let { topics, article } = req.body

    topics = topics.filter((topic) => {
        if (topic != null) {
            topic.article = article._id
            return topic
        }

    })

    console.log(topics)
    try {
        await Topic.insertMany(topics).then(() => { })
        let topics2 = await Topic.find({ article: article._id }).lean()
        res.status(200).json({ success: { message: "Topics Added Successfully" }, topics: topics2 })

    } catch (error) {

        res.status(200).json({ error: { message: `Error:${error}` } })
    }


}
// write outline for ${input} ${promt}