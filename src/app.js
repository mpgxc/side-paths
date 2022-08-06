const AWSXRay = require('aws-xray-sdk-core')
const AWS = AWSXRay.captureAWS(require('aws-sdk'))

const deleteAccount = event => {
  try {
    const sns = new AWS.SNS()

    const deleteAccountEvent = {
      ...event,
      created: new Date(),
    }

    console.log(deleteAccountEvent)

    return sns.publish({
      Message: JSON.stringify(deleteAccountEvent),
      TopicArn: process.env.SNS_TOPIC_ARN,
    }).promise()
  } catch (error) {
    console.error({
      error,
    })
  }
}

module.exports = {
  deleteAccount,
}
