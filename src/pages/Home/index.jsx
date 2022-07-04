import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components";
import "./styles.scss";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h1 className="home__title">Game of Life</h1>
      <img
        className="home__logo"
        src="https://kevingal.com/static/img/mona-lisa-gol/spaceship.gif"
        alt="gif"
      />
      <Button onClick={() => navigate("/main")}>Entrar</Button>
    </div>
  );
}
