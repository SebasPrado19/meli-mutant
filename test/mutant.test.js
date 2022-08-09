const mutant_controller = require('../services/controllers/mutant.js')

// Realizar pruebas con cadena mutante 
const dna_mutant = [
  "ATGCGA",
  "CAGTGC",
  "TTATGT",
  "AGAAGG",
  "CCCCTA",
  "TCACTG"
]

test('check mutant dna string', () => {
  expect(mutant_controller.isMutant(dna_mutant)).toBe(true);
});

// Realizar prueba con cadena no mutante
const dna_no_mutant = [
  "ATGCGA",
  "CAGTGC",
  "TTATTT",
  "AGACGG",
  "GCGTCA",
  "TCACTG"
]

test('check no mutant dna string', () => {
  expect(mutant_controller.isMutant(dna_no_mutant)).toBe(false);
});
