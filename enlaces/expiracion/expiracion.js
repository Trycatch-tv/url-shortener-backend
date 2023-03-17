const AWS = require("aws-sdk")

AWS.config.update({ region: "us-east-1" })

const dynamodb = new AWS.DynamoDB.DocumentClient()

module.exports.handler = async (event) => {
  const id = event.pathParameters.id
  const fecha_expiracion = event.queryStringParameters.fecha_expiracion

  await dynamodb
    .update({
      TableName: "enlacesTable",
      UpdateExpression: "set fecha_expiracion = :fecha",
      ExpressionAttributeValues: {
        ":fecha": fecha_expiracion,
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
        data: "Fecha de expiración actualizada",
      },
      null,
      2
    ),
  }
}
