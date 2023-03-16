const AWS = require("aws-sdk")

AWS.config.update({ region: "us-east-1" })

const dynamodb = new AWS.DynamoDB.DocumentClient()

module.exports.handler = async (event) => {
  const id = event.pathParameters.id

  await dynamodb
    .update({
      TableName: "enlacesTable",
      UpdateExpression: "set estado = :estado",
      ExpressionAttributeValues: {
        ":estado": 0,
      },
      Key: {
        id: id,
      },
      ReturnValues: "ALL_NEW",
    })
    .promise()

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        data: "Enlace eliminado",
      },
      null,
      2
    ),
  }
}
