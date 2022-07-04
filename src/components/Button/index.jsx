import React from "react";
import "./styles.scss";

export default function Button(props) {
  const { darkMode, children, onClick, name } = props;

  const btnClassName = darkMode ? "button button--dark" : "button";

  const handleClick = (e) => {
    onClick(e);
  };

  return (
    <button className={btnClassName} onClick={handleClick} name={name}>
      {children}
    </button>
  );
}

// Se crea el componente Button para que el proyecto sea escable y reutilizable a la larga.
