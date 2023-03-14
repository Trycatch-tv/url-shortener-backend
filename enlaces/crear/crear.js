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

  const obj = {
    enlace_original,
    enlace_corto,
    fecha_expiracion,
    usuario,
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
