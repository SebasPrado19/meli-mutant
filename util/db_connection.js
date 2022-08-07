const mysql = require("mysql")
const { SecretManagerServiceClient } = require("@google-cloud/secret-manager")


const CLOUD = process.env.CLOUD || false

const SMClient = new SecretManagerServiceClient({
  keyFilename: __dirname + '/secret_manager_key.json',
});

module.exports.createPool = async () => {
  try {
    // Crearr pool de conexión a la base de datos
    const [secret] = await SMClient.accessSecretVersion({
      name: 'projects/959341657400/secrets/db-connection/versions/latest',
    });

    const credentials = JSON.parse(secret.payload.data.toString())
    if (!CLOUD) {
      credentials['host'] = '127.0.0.1'
    }

    const pool = mysql.createPool(credentials);
    return pool;
  } catch (err) {
    console.log('ERROR', err)
  }
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