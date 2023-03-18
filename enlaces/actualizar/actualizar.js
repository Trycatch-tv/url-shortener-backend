const AWS = require("aws-sdk")

AWS.config.update({ region: "us-east-1" })

const dynamodb = new AWS.DynamoDB.DocumentClient()

module.exports.handler = async (event) => {
  const id = event.pathParameters.id
  const enlace_corto = event.queryStringParameters.enlace_corto

  await dynamodb
    .update({
      TableName: "enlacesTable",
      UpdateExpression: "set enlace_corto = :enlace_corto",
      ExpressionAttributeValues: {
        ":enlace_corto": enlace_corto,
      },
      Key: {
        id: id,
      },
      ReturnValues: "ALL_NEW",
    })
    .promise()

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(
      {
        data: "Enlace actualizado",
      },
      null,
      2
    ),
  }
}
