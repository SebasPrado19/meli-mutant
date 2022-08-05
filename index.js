const express = require('express');
const server = express();
const mutant = require('./services/routes/mutant.js');
const bodyParser = require('body-parser');
const db_connection = require('./util/db_connection')

var GLOBAL = {}

server.use(bodyParser.json());

server.use('/mutant', mutant); // accede a las rutas específicas mutant


const PORT = process.env.PORT || 8000;
server.listen(PORT, async () => {
  GLOBAL.CONNECTION = await db_connection.createPool()
  console.log(`Server listening on port ${PORT}...`); // expone el servidor en el puerto especificado
});

module.exports.GLOBAL = GLOBAL