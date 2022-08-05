const express = require('express');
const router = express.Router();
const mutant_controller = require('../controllers/mutant')
const index = require('../../index')
const db_connection = require('../../util/db_connection')

router.post('/', async (req, res) => {

  const { dna } = req.body
  const con = index.GLOBAL.CONNECTION

  // ejecuta la verificacion de si es o no mutante
  const is_mutant = await mutant_controller.isMutant(dna)

  const sql = `INSERT INTO stats (dna, is_mutant) VALUES (?, ?)`
  const binds = [
    JSON.stringify(dna),
    is_mutant
  ]

  await db_connection.query(con, sql, binds)

  if (is_mutant) {
    res.status(200).send({
      success: "conexión mutante desde controller",
    });
  } else {
    res.status(403).send({
      error: "forbiden west",
    })
  }
})

router.get('/stats', async (req, res) => {

  try {
    const con = index.GLOBAL.CONNECTION
    const sql = `SELECT * FROM stats;`;
  
    const result = await db_connection.query(con, sql)
    res.status(200).send({
      msg: "stats",
      stats: result
    });
  } catch (err){
    res.status(500).send({
      status: "Error",
      err
    });
  }


})

module.exports = router;

