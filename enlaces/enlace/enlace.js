const AWS = require("aws-sdk")

AWS.config.update({ region: "us-east-1" })

const dynamodb = new AWS.DynamoDB.DocumentClient()

module.exports.handler = async (event) => {
  const id = event.pathParameters.id

  const resultado = await dynamodb
    .scan({
      TableName: "enlacesTable",
      FilterExpression: "id = :id AND estado = :estado",
      ExpressionAttributeValues: {
        ":id": id,
        ":estado": 1,
      },
    })
    .promise()

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        data: resultado.Items,
      },
      null,
      2
    ),
  }
}
