// Se crea este archivo de constantes por dos razones:

// 1- En el caso de utilizar strings que se tengan que escribir varias veces,
// se pueden cometer errores al tipiarlos.
// Teniendo los almacenados en una constante disminuimos el margen de error.

// 2- Para darle mayor escalabilidad al proyecto.
// Por ejemplo la constante OPERATIONS funciona para localizar los vecinos de la celula
// que se esta evaluando, esto quiere decir que podria generar una constante con nuevas coordenadas
// y cambiar las reglas del juego.

// En el caso de los PATTERNS, simplemente con crear constantes nuevas con las coordenadas especificas
// se podran agregar los patrones que se deseen al tablero.

const GRID_SIZE = {
  SMALL: "SMALL",
  MEDIUM: "MEDIUM",
  LARGE: "LARGE"
};

const OPERATIONS = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0]
];

const OSCILLATORS_PATTERNS = [
  [2, 2],
  [2, 3],
  [2, 4],
  [3, 7],
  [3, 8],
  [3, 9],
  [4, 6],
  [4, 7],
  [4, 8],
  [6, 11],
  [6, 12],
  [7, 11],
  [9, 13],
  [8, 14],
  [9, 14]
];

const SPACESHIPS_PATTERNS = [
  [1, 3],
  [2, 1],
  [2, 3],
  [3, 2],
  [3, 3]
];

export { GRID_SIZE, OPERATIONS, OSCILLATORS_PATTERNS, SPACESHIPS_PATTERNS };
