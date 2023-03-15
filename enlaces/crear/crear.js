const AWS = require("aws-sdk")
AWS.config.update({ region: "us-east-1" })

const ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" })

module.exports.handler = async (event) => {
  // Aqui va el proceso
  /*
  enlace_original -> string -> queryParam
  enlace_corto -> string ? -> queryParam
  fecha_expiracion -> Date ? -> queryParam
  usuario -> string -> JWT
  createdAt -> Date -> local
  updatedAt -> Date -> local
  estado -> boolean -> local -> default -> 1
  */
  const enlace_original = event.queryStringParameters.enlace_original
  const enlace_corto = event.queryStringParameters.enlace_corto
  const fecha_expiracion = event.queryStringParameters.fecha_expiracion
  const usuario = "12345"
  let tableNames
  // Obtener tablas creadas en DynamoDB
  ddb.listTables({ Limit: 10 }, function (err, data) {
    if (err) {
      console.log("Error", err.code)
    } else {
      tableNames = data.TableNames
      console.log("Table names are ", data.TableNames)
    }
  })

  const obj = {
    //enlace_original,
    //enlace_corto,
    //fecha_expiracion,
    //usuario,
    tableNames,
  }
  //
  return {
    statusCode: 201,
    body: JSON.stringify(
      {
        data: obj,
      },
      null,
      2
    ),
  }
}
