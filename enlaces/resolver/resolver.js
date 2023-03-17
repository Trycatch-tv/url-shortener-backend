const AWS = require("aws-sdk")

AWS.config.update({ region: "us-east-1" })

const dynamodb = new AWS.DynamoDB.DocumentClient()

module.exports.handler = async (event) => {
  const enlace_corto = event.pathParameters.enlace_corto

  const resultado = await dynamodb
    .scan({
      TableName: "enlacesTable",
      FilterExpression: "enlace_corto = :enlace_corto AND estado = :estado",
      ExpressionAttributeValues: {
        ":enlace_corto": enlace_corto,
        ":estado": 1,
      },
    })
    .promise()

  const enlace = resultado.Items[0]

  return {
    statusCode: 301,
    headers: {
      Location: enlace.enlace_original,
    },
    body: JSON.stringify(
      {
        data: enlace.enlace_original,
      },
      null,
      2
    ),
  }
}
