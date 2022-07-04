import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { handleSelect } from "../../utils/functions";
import "./styles.scss";

export default function Cell(props) {
  const { cellId, col, isAlive, row } = props;
  const { data, setData, isDarkMode } = useContext(AppContext);

  // Se crean funciones generadoras de ccs dinamico para darle mayor legibilidad al codigo JSX.

  const getCellClassName = () => {
    let cellClassName = isAlive ? "cell cell--alive" : "cell cell--dead";
    cellClassName = isDarkMode ? cellClassName + " cell--dark" : cellClassName;

    return cellClassName;
  };

  return (
    <div
      className={getCellClassName()}
      id={cellId}
      onClick={() => handleSelect(data, row, col, setData)}
    />
  );
}
