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
  name: 'enhance',
  type: 1,
  description: 'Have Aida enhance your message.',
  options: [
    {
      name: 'text',
      description: 'The tweet content for Aida to enchance.',
      required: true,
      type: 3,
    },
    {
      name: 'instruction',
      description: 'How Aida should enhance your text.',
      required: true,
      type: 3,
    },
  ],
}

exports.action = async (body) => {
  const text = body.data.options.find(o => o.name === "text")
  const instruction = body.data.options.find(o => o.name === "instruction")

  const completion = await openai.createEdit({
    model: "text-davinci-edit-001",
    input: text.value,
    instruction: instruction.value,
    user: body.member?.user?.id,
  });
  let response = {
    "content": `> ${text.value}\n> ${instruction.value}\n${completion.data.choices[0].text}`
  }
  return response
}

exports.handler = (event) => {
  globalHandler(event, exports.action)
}
