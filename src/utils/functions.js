import produce from "immer";

// ------------------------------------
// Funcion play
// ------------------------------------

// Parametros
// baseState = State que se desea modificar.
// arrayOperations = Son numeros que se van a sumar o restar para generar coordenadas.
// updaterFunction = funcion actualizadora del baseState.
// rows, cols = los limites del grid.

const play = (baseState, arrayOperations, updaterFunction, rows, cols) => {
  // Se utiliza produce, porque crea una copia del state la cual se puede mutar
  const newGrid = produce(baseState.grid, (draftState) => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let count = 0;
        // Por cada celula que se itere, se realiza un forEach para sumar la fila (i) y la columna (j) + los operations
        arrayOperations.forEach(([x, y]) => {
          // coordenadas de las celulas vecinas
          const newI = i + x;
          const newJ = j + y;
          // Todas las declaraciones van a sumar 1 a count en caso de que las condiciones sean verdaderas.
          // La primera condicion se usa para limitar la ubicacion de las celulas vecinas
          // que contemplen numeros desde cero hasta rows o cols - 1
          if (
            newI >= 0 &&
            newI < rows &&
            newJ >= 0 &&
            newJ < cols &&
            baseState.grid[newI][newJ]
          ) {
            count++;
          } else if (
            // Apartir de esta condicion se evalua si alguna (o ambas) de las coordenadas es menor a cero (-1) y/o igual o mayor a rows/cols
            // Por ejemplo: si newI = -1, entonces la coordenada que se utiliza es rows - 1
            //              Si newI >= rows, entonces la coordenada que se utiliza es newI - newI = 0
            //              (Este patron aplica para newJ utilizando cols)

            // Con esta logica el tablero se vuelve esferico
            newI < 0 &&
            newJ >= 0 &&
            newJ < cols &&
            baseState.grid[rows - 1][newJ]
          ) {
            count++;
          } else if (
            newI >= rows &&
            newJ >= 0 &&
            newJ < cols &&
            baseState.grid[newI - newI][newJ]
          ) {
            count++;
          } else if (
            newJ < 0 &&
            newI >= 0 &&
            newI < rows &&
            baseState.grid[newI][cols - 1]
          ) {
            count++;
          } else if (
            newJ >= cols &&
            newI >= 0 &&
            newI < rows &&
            baseState.grid[newI][newJ - newJ]
          ) {
            count++;
          } else if (
            newI < 0 &&
            newJ < 0 &&
            baseState.grid[rows - 1][cols - 1]
          ) {
            count++;
          } else if (
            newI < 0 &&
            newJ >= cols &&
            baseState.grid[rows - 1][newJ - newJ]
          ) {
            count++;
          } else if (
            newI >= rows &&
            newJ >= cols &&
            baseState.grid[newI - newI][newJ - newJ]
          ) {
            count++;
          } else if (
            newI >= rows &&
            newJ < 0 &&
            baseState.grid[newI - newI][rows - 1]
          ) {
            count++;
          }
        });

        // Al evaluar a todas las celulas vecinas, se utiliza a count como condicion para matar o que nazca una celula
        if (count < 2 || count > 3) {
          draftState[i][j] = false;
        } else if (baseState.grid[i][j] === false && count === 3) {
          draftState[i][j] = true;
        }
      }
    }
  });

  console.log(newGrid);
  // se actualiza el state
  updaterFunction({
    generation: baseState.generation + 1,
    grid: newGrid
  });
};

// ------------------------------------
// Funcion de Patrones
// ------------------------------------

// Parametros
// baseState = State que se desea modificar.
// patternCoordinates = coordenadas que se deben modificar en el grid
// updaterFunction = funcion actualizadora del baseState.
const gridPattern = (baseState, patternCoordinates, updaterFunction) => {
  const newGrid = produce(baseState.grid, (draftState) => {
    patternCoordinates.forEach(([x, y]) => {
      draftState[x][y] = true;
    });
  });

  updaterFunction({
    generation: 0,
    grid: newGrid
  });
};

// --------------------------------------------
// Funcion para activar o desactivar celulas
// --------------------------------------------

const handleSelect = (baseState, row, col, updaterFunction) => {
  const newGrid = produce(baseState.grid, (draftState) => {
    if (baseState.grid[row][col]) {
      draftState[row][col] = false;
    } else {
      draftState[row][col] = true;
    }
  });

  updaterFunction({
    generation: baseState.generation,
    grid: newGrid
  });
};

export { play, gridPattern, handleSelect };
