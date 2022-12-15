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
  name: 'tweet',
  type: 1,
  description: 'Ask Aida to write a tweet for you.',
  options: [
    {
      name: 'text',
      description: 'The tweet content for Aida to write about.',
      required: true,
      type: 3,
    },
    {
      name: 'hashtags',
      description: 'Ask Aida to include hashtags. Defaults to Yes',
      type: 5,
    },
  ],
}

exports.action = async (body) => {
  const { value } = body.data.options.find(o => o.name === "text")
  const hashtags = body.data.options.find(o => o.name === "hashtags")

  let prompt = `Write a Tweet to post on Twitter. The post must be under 140 characters long. ${value}.`
  if (hashtags?.value === false) {
    prompt += "Do not include hash tags!\n"
  } else {
    prompt += "Include relevant hash tags!\n"
  }

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    user: body.member?.user?.id,
    max_tokens: 70,
    stop: hashtags?.value === false ? '#' : undefined,
    best_of: 3,
  });
  let response = {
    "content": `> ${value}\n${completion.data.choices[0].text}`
  }
  return response
}

exports.handler = (event) => {
  globalHandler(event, exports.action)
}
