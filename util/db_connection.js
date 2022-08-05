const mysql = require("mysql")

module.exports.createPool = async () => {
  // Crearr pool de conexión a la base de datos
  // const [secret] = await SMClient.accessSecretVersion({
  //   name: server.GLOBAL.ONE_FACES_SECRET,
  // });

  // const credentials = JSON.parse(secret.payload.data.toString());
  const credentials = {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'pb)OV]qIKqg]?gD^',
    database: 'gen-mutante'
  }

  credentials["connectionLimit"] = 20;
  credentials["multipleStatements"] = true;

  const pool = mysql.createPool(credentials);
  return pool;
};

module.exports.query = async (con, sql, binds = null) => {
  return new Promise((resolve, reject) => {
    con.query(sql, binds, (err, result, fields) => {
      if (err) reject(err)
      else {
        resolve(result)
      }
    })
  })
}