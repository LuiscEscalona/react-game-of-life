import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Grid, Menu } from "../../components";
import Popup from "reactjs-popup";

import "./styles.scss";

export default function Main() {
  const { isDarkMode } = useContext(AppContext);
  const titleClassName = isDarkMode
    ? "main__content__title main__content__title--dark"
    : "main__content__title";

  const questionIcon = () => {
    let color = isDarkMode ? `30475e` : `121212`;

    return (
      <img
        className="triggerpopup"
        src={`https://img.icons8.com/fluency-systems-regular/48/${color}/help.png`}
        alt="question-icon"
      />
    );
  };

  return (
    <div className="main">
      <div className="main__content">
        <h1 className={titleClassName}>Game of Life</h1>
        <Rules trigger={questionIcon} />
        <Menu />
        <Grid />
      </div>
    </div>
  );
}

function Rules({ trigger }) {
  return (
    <Popup className="popup-background" trigger={trigger} modal>
      {(close) => (
        <div className="modal-container">
          <a className="close" onClick={close}>
            &times;
          </a>
          <h3>Reglas del juego</h3>
          <span>
            Una célula muerta con exactamente 3 células vivas vecinas, “nace”
            (es decir, al turno siguiente estará viva).
          </span>
          <span>
            Una célula viva con 2 o 3 células vecinas vivas se mantiene viva.
          </span>
          <span>
            Una célula viva conmenos de 2 células vecinas vivas muere de
            “soledad”.
          </span>
          <span>
            Una célula viva con más de 3 células vecinas vivas muere por
            “sobrepoblación”
          </span>
        </div>
      )}
    </Popup>
  );
}
