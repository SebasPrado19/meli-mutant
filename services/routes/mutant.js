const express = require('express');
const router = express.Router();
const mutant_controller = require('../controllers/mutant')
const index = require('../../server')
const db_connection = require('../../util/db_connection')

router.post('/', async (req, res) => {

  const { dna } = req.body
  const con = index.GLOBAL.CONNECTION

  // ejecuta la verificacion de si es o no mutante
  const is_mutant = await mutant_controller.isMutant(dna)

  // Ejecuta el procedimiento almacenado para insertar o actualizar el estado de una cadena de ADN
  const sql = `call sp_save_dna(?, ?);`
  const binds = [
    JSON.stringify(dna),
    is_mutant
  ]

  await db_connection.query(con, sql, binds)

  if (is_mutant) {
    res.status(200).send({
      success: "Se ha identificado un ADN mutante",
    });
  } else {
    res.status(403).send({
      error: "forbiden west",
    })
  }
})

router.get('/stats', async (req, res) => {
  // Obtiene las estadisticas de mutantes, humanos y muestras tomadas

  try {
    const con = index.GLOBAL.CONNECTION
    const sql = `SELECT is_mutant, count(*) as total  FROM tbl_stats group by is_mutant;`;

    const result = await db_connection.query(con, sql);
    const count_mutant_dna = result.find(x=> x.is_mutant == 1).total
    const count_human_dna = result.find(x=> x.is_mutant == 0).total
    const ratio = count_mutant_dna / (count_mutant_dna + count_human_dna) // Calcula el ratio de mutantes dentro del total de muestras tomadas
    const stats = { count_mutant_dna, count_human_dna, ratio }
    res.status(200).send(
      stats
    );
  } catch (err) {
    console.log(err)
    res.status(500).send({
      status: "Error",
      err
    });
  }


})

module.exports = router;

