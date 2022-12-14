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
  chat: 'Chat with Aida!\nYou can type your questions or statements, and Aida will respond with answers. Aida is designed to simulate human conversation, and can be a helpful way to get information or complete tasks.',
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
