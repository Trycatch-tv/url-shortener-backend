const AWS = require("aws-sdk")
const { v4 } = require("uuid")

AWS.config.update({ region: "us-east-1" })

const dynamodb = new AWS.DynamoDB.DocumentClient()

module.exports.handler = async (event) => {
  const enlace_original = event.queryStringParameters.enlace_original
  const enlace_corto = event.queryStringParameters.enlace_corto
  const fecha_expiracion = event.queryStringParameters.fecha_expiracion
  const usuario = "12345"

  const createdAt = new Date().toISOString()
  const id = v4()

  const nuevoEnlace = {
    id,
    enlace_original,
    enlace_corto,
    fecha_expiracion,
    usuario,
    estado: 1,
    createdAt,
  }

  await dynamodb
    .put({
      TableName: "enlacesTable",
      Item: nuevoEnlace,
    })
    .promise()

  return {
    statusCode: 201,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(
      {
        data: nuevoEnlace,
      },
      null,
      2
    ),
  }
}
