import { Configuration, OpenAIApi } from "openai";
require('dotenv').config()
// const Article = require("../../models/article")
import Topic from "../../models/topic"



export default async function (req, res) {
  console.log("writing topic")
  console.log(req.body. settings.prompt)
  
  const {topic,settings} = req.body
  const configuration = new Configuration({
    apiKey: settings.apiKey,
  });

  const openai = new OpenAIApi(configuration);

  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const input = topic.topic || '';
  if (input.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid Input",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: settings.model.value,
      prompt: generatePrompt(input,settings.promt),
      temperature: settings.temperature,
      max_tokens: settings.tokens,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    console.log(completion.data.choices[0].text.split(","))
    await Topic.findOneAndUpdate({_id:topic._id},{para:completion.data.choices[0].text})
    res.status(200).json({ result: completion.data.choices[0].text });

  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(input,promt) {

  return `write ${input}, ${promt}`
}