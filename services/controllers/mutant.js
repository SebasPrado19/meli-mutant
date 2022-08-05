
const isMutant = (dna) => {
  // Dentro de este método se valida la cadena de adn

  let dna_matrix = []
  // Crea una matriz con las letras
  for (const seq of dna) {
    const seq_arr = Array.from(seq)
    dna_matrix.push(seq_arr)
  }

  for (const seq of dna_matrix) {
    if (seq.length != dna_matrix.length) return false // retorna false si la cadena de caracteres no es de NxN
  }

  const seq_length = dna_matrix[0].length; // largo de la primera secuencia como referencia
  let count_seq = 0;
  count_seq = count_seq + checkHorizontal(dna);
  count_seq = count_seq + checkVertical(seq_length, dna_matrix);
  count_seq = count_seq + checkDiagonal(seq_length, dna_matrix);
  count_seq = count_seq + checkDiagonalInv(seq_length, dna_matrix);

  // console.log(`count seq x ${count_seq}`)
  return (count_seq > 1) // SI MÁS DE UNA SECUENCIA CONTIENE EL GEN MUTANTE RETORNA TRUE

}

const checkHorizontal = (dna) => {
  // cuenta las secuencias horizontales que cumplan con el gen
  let count_h = 0
  for (const seq of dna) {
    const seq_x = check_sequence(seq)
    count_h = count_h + seq_x
  }
  return count_h;
}

const checkVertical = (seq_length, dna_matrix) => {
  // cuenta las secuencias verticales que cumplan con el gen
  let count_v = 0;
  for (let i = 0; i < seq_length; i++) {
    // Utiliza la matriz para generar secuencias verticales
    let new_seq = '';
    for (const seq of dna_matrix) {
      const character = seq[i] ? seq[i] : '-' // en caso de que algun valor esté mal y no contenga toda la cantidad de caracteres
      new_seq = new_seq + character
    }
    const seq_y = check_sequence(new_seq)
    count_v = count_v + seq_y
  }
  return count_v;
}

const checkDiagonal = (seq_length, dna_matrix) => {
  // cuenta diagonales de izquierda a derecha que cumplan con el gen
  let count_z = 0
  const matrix_l = dna_matrix.length;

  for (let i = matrix_l - 1; i > 0; i--) {
    // Crea diagonales desde la esquina inferior izquierda
    let new_seq = ''
    for (let j = 0; j < seq_length; j++) {
      const char = dna_matrix[i + j] ? dna_matrix[i + j][j] : '-'
      new_seq = new_seq + char
      if (new_seq.length == seq_length) {
        const seq_z = check_sequence(new_seq)
        count_z = count_z + seq_z
      }
    }
  }

  for (let i = 0; i < seq_length; i++) {
    // Crea diagonales desde la esquina superior izquierda en adelante
    let new_seq = '';
    for (const [j, seq] of dna_matrix.entries()) {
      const character = seq[i + j] ? seq[i + j] : '-' // en caso de que algun valor esté mal y no contenga toda la cantidad de caracteres
      new_seq = new_seq + character
    }
    const seq_z = check_sequence(new_seq)
    count_z = count_z + seq_z
  }

  return count_z;
}

const checkDiagonalInv = (seq_length, dna_matrix) => {
  // cuenta los diagonales de derecha a izquierda que cumplan con el gen
  let count_z = 0
  const matrix_l = dna_matrix.length;

  for (let i = matrix_l - 1; i >= 1; i--) {
    // Crea diagonales desde la esquina inferior derecha 
    let new_seq = ''
    for (let j = 0; j < seq_length; j++) {
      const char = dna_matrix[i + j] ? dna_matrix[i + j][matrix_l - 1 - j] : '-'
      new_seq = new_seq + char;
      if (new_seq.length == seq_length) {
        const seq_z = check_sequence(new_seq)
        count_z = count_z + seq_z
      }
    }
  }

  for (let i = matrix_l - 1; i > 0; i--) {
    // Crea diagonales desde la esquina superior derecha a izq
    let new_seq = ''
    for (let j = seq_length - 1; j >= 0; j--) {
      const char = dna_matrix[i - j] ? dna_matrix[i - j][j] : '-'
      new_seq = new_seq + char
      if (new_seq.length == seq_length) {
        const seq_z = check_sequence(new_seq)
        count_z = count_z + seq_z
      }
    }
  }

  return count_z;
}


const check_sequence = (seq) => {
  //valida una secuencia enviada para ver si cualquiera de los 4 genes mutantes existen 
  let gen_x = 0;
  const gen_mutant = ['AAAA', 'TTTT', 'CCCC', 'GGGG']

  for (let i = 0; i < seq.length; i++) {
    const sub_seq = seq.substring(i, i + 4).toUpperCase() // separa en bloques de 4 caracteres y convierte la cadena a mayúscula
    if (sub_seq.length === 4) {
      // valida que el substring tenga 4 caracteres y que este sea alguno de los genes mutantes
      for (const gen of gen_mutant) {
        if (sub_seq.indexOf(gen) > -1) {
          gen_x++
        }
      }
    }
  }

  return gen_x;
}

// Metodo donde se va a validar si es mutante
exports.isMutant = isMutant;