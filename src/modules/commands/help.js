/**
 * A Lambda function that replies with help information.
 */

const { globalHandler } = require('../handler.js')

exports.data = {
  name: 'help',
  type: 1,
  description: 'See what Aida can do.',
}

const HELP_DOC = {
  chat: 'Send a message to Aida and she responds to you.',
}

exports.action = async () => {
  return {
    content: '',
    embeds: [
      {
        title: 'Aida Help',
        type: 'rich',
        fields: Object.keys(HELP_DOC).map((name) => ({
          name: `/${name}`,
          value: HELP_DOC[name],
          inline: false,
        })),
      },
    ],
  }
}

exports.handler = (event) => {
  globalHandler(event, exports.action)
}
