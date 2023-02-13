import { Configuration, OpenAIApi } from "openai";
require('dotenv').config()


export default async function (req, res) {
  
  const configuration = new Configuration({
    apiKey: req.body.apiKey,
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

  const input = req.body.input || '';
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
      model: model,
      prompt: generatePrompt(input,promt),
      temperature: temperature,
      max_tokens: tokens,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    console.log(completion.data.choices[0].text.split(","))
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

  return `write about ${input} of 200 to 300 words.${promt}`
}