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
  description: 'Chat with Aida.',
  options: [
    {
      name: 'text',
      description: 'The text to send to Aida.',
      required: true,
      type: 3,
    },
  ],
}

exports.action = async (body) => {
  const { value } = body.data.options.find(o => o.name === "text")
  
  // May do something here with body
  // Body contains Discord command details
  const completion = await openai.createCompletion({
    // model: "text-curie-001",
    model: "text-davinci-003",
    prompt: value,
    user: body.member?.user?.id,
    stop: '.',
    max_tokens: 64,
  });
  let response = {
    "content": `> ${value}\n${completion.data.choices[0].text}`
  }
  return response
}

exports.handler = (event) => {
  globalHandler(event, exports.action)
}
