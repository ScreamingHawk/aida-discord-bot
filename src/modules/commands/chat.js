/**
 * A Lambda function that replies to interaction with an OpenGPT response.
 */
const { Configuration, OpenAIApi } = require("openai");

const { globalHandler } = require('../handler.js')

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.data = {
  name: 'chat',
  type: 1,
  description: 'Chat with Aida.'
}

exports.action = async (body) => {
  // May do something here with body
  // Body contains Discord command details
  const completion = await openai.createCompletion({
    model: "text-curie-001",
    prompt: "Hello world",
  });
  let response = {
    "content": completion.data.choices[0].text
  }
  return response
}

exports.handler = (event) => {
  globalHandler(event, exports.action)
}
