import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import Cell from "./../Cell";
import "./styles.scss";

// La funcion createCellsArray se declara fuera del componente grid.
// De esta forma se evita ocupar espacio en la memoria cada vez que se renderiza el componente.

const createCellsArray = (rows, cols, arr) => {
  let isAlive = false;
  let gridScreen = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // Creacion del ID
      let cellId = `${i}_${j}`;
      // El booleano isAlive se utiliza como condicional dentro del componente Cell
      // para el ccs de cada celula.
      isAlive = arr && arr[i][j] ? true : false;

      gridScreen.push(
        <Cell isAlive={isAlive} key={cellId} cellId={cellId} row={i} col={j} />
      );
    }
  }

  return gridScreen;
};

export default function Grid() {
  const { data, cols, rows } = useContext(AppContext);

  // Calculo el width del grid en base al numero de columnas y lo paso como style inline.
  const width = cols * 17;

  const cellsArray = createCellsArray(rows, cols, data.grid);

  return (
    <div className="grid" style={{ width: width }}>
      {cellsArray}
    </div>
  );
}
