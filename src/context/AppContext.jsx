import React, { useState, createContext } from "react";

export const AppContext = createContext();

export const AppProvider = (props) => {
  // Funcion generadora del grid, con todas las celulas seteadas en false o "muertas"

  const generateEmptyGrid = (x, y) => {
    const rows = [];
    for (let i = 0; i < x; i++) {
      rows.push(Array.from(Array(y), () => false));
    }
    return rows;
  };

  // ------------------------------------
  // states del grid, generacion de celulas, columnas, filas y darkMode
  // ------------------------------------

  // Se crea un objeto donde esta la generacion y el grid.
  // De esta forma se trabaja de una manera mas facil cuando se actualicen ambos estados
  // Tambien facilita el almacenaje del localStorage

  const [data, setData] = useState({
    generation: 0,
    grid: generateEmptyGrid(30, 50)
  });

  const [cols, setCols] = useState(50);

  const [rows, setRows] = useState(30);

  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <AppContext.Provider
      value={{
        data,
        setData,
        cols,
        setCols,
        rows,
        setRows,
        generateEmptyGrid,
        isDarkMode,
        setIsDarkMode
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
