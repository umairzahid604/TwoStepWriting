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
      model: "text-davinci-003",
      prompt: generatePrompt(input),
      temperature: 0.7,
      max_tokens: 300,
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

function generatePrompt(input) {

  return ` write an paragraph of 100 to 300 words write like human
  title: What is a Distributed Version Control System?
  paragraph: A distributed version control system is a system that helps you keep track of changes you've made to files in your project.

  This change history lives on your local machine and lets you revert to a previous version of your project with ease in case something goes wrong.
  
  Git makes collaboration easy. Everyone on the team can keep a full backup of the repositories they're working on on their local machine. Then, thanks to an external server like BitBucket, GitHub or GitLab, they can safely store the repository in a single place.
  
  This way, different members of the team can copy it locally and everyone has a clear overview of all changes made by the whole team.
  
  title:${input}
  paragraph:`
}
