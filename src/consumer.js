const AWSXRay = require('aws-xray-sdk-core')
const AWS = AWSXRay.captureAWS(require('aws-sdk'))
const uuid = require('uuid-by-string')

const dynamodClient = new AWS.DynamoDB.DocumentClient()

const recordDeletedAccountInfo = ({ Records }) => {
  const [{ body }] = Records

  console.log({body})

  const { email, created } = JSON.parse(body)

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      userId: uuid(email, 'eureka'),
      deletedAt: created,
    },
  }

  return dynamodClient.put(params).promise()
}

module.exports = {
  recordDeletedAccountInfo,
}
