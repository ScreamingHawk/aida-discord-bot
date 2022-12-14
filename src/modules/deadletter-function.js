/**
 * Handles messages in the Dead Letter Queue.
 */

const axios = require('axios').default;

exports.handler = async (event) => {
  await Promise.all(event.Records.map(async (sqsRecord) => {
    const snsEvent = JSON.parse(sqsRecord.body)
    const body = JSON.parse(snsEvent.Records[0].Sns.Message)
    await axios.patch(`https://discord.com/api/v10/webhooks/${body.application_id}/${body.token}/messages/@original`, {
      content: "**⚠️ Error!**"
    })
  }))
}
