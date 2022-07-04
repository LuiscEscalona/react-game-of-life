import React, { useContext, useEffect, useState } from "react";
import Button from "../Button";
import { Dropdown, DropdownOption } from "../Dropdown";
import { AppContext } from "../../context/AppContext";
import "./styles.scss";
import {
  GRID_SIZE,
  OPERATIONS,
  OSCILLATORS_PATTERNS,
  SPACESHIPS_PATTERNS
} from "../../utils/constants";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { gridPattern, play } from "../../utils/functions";

export default function Menu() {
  const {
    data,
    setData,
    rows,
    setRows,
    cols,
    setCols,
    generateEmptyGrid,
    isDarkMode,
    setIsDarkMode
  } = useContext(AppContext);

  const [speed, setSpeed] = useState("300");
  const [selectedSize, setSelectedSize] = useState(GRID_SIZE.MEDIUM);
  const [active, setActive] = useState(false);
  const [step, setStep] = useState(false);
  const [pattern, setPattern] = useState("");
  const [dataStorage, setDataStorage] = useLocalStorage("dataStorage", {});

  // ------------------------------------
  // useEffect
  // ------------------------------------
  // Se maneja dentro de useEffects: play, steps y los patterns

  // Play
  useEffect(() => {
    let interval;
    if (active) {
      interval = setInterval(() => {
        play(data, OPERATIONS, setData, rows, cols);
      }, speed);
    }
    return () => clearInterval(interval);
  }, [active, data, speed]);

  // Steps
  useEffect(() => {
    if (step) {
      play(data, OPERATIONS, setData, rows, cols);
      setStep(false);
    }
  }, [step]);

  // Patterns
  useEffect(() => {
    if (pattern === "oscillators") {
      gridPattern(data, OSCILLATORS_PATTERNS, setData);
    } else if (pattern === "spaceships") {
      gridPattern(data, SPACESHIPS_PATTERNS, setData);
    }

    setPattern("");
  }, [pattern]);

  // Dependiendo del size seteamos el grid. Eventualmente podria haber mas sizes,
  // por eso la utilizacion de un switch. Tambien se podria buscar la forma de abstraer
  // esto a otro file pero por simplicidad de momento se maneja aqui mismo
  const setGridSize = (size) => {
    setSelectedSize(size);

    switch (size) {
      case GRID_SIZE.SMALL:
        setData({
          generation: 0,
          grid: generateEmptyGrid(10, 20)
        });
        setCols(20);
        setRows(10);

        break;
      case GRID_SIZE.MEDIUM:
        setData({
          generation: 0,
          grid: generateEmptyGrid(30, 50)
        });
        setCols(50);
        setRows(30);

        break;
      default:
        setData({
          generation: 0,
          grid: generateEmptyGrid(50, 70)
        });
        setCols(70);
        setRows(50);
    }
  };

  // ------------------------------------
  // Handlers
  // ------------------------------------

  // Reinicar el grid
  const handleRestart = () => {
    setActive(false);
    setData({
      generation: 0,
      grid: generateEmptyGrid(rows, cols)
    });
  };

  // Cambios de intervalos
  const handleSetSpeed = (value) => {
    setSpeed(value);
  };

  // localStorage
  const handleDataStorage = () => {
    setDataStorage(data);
  };

  // localStorage - Ultimo patron
  const handleLoadLastPattern = () => {
    setData(dataStorage);
  };

  // ------------------------------------
  // ClassNames
  // ------------------------------------

  const btnClassName = isDarkMode ? "menu__btn menu__btn--dark" : "menu__btn";
  const menuSelectTitleClassName = isDarkMode
    ? "menu__controls__dropdown__title menu__controls__dropdown__title--dark"
    : "menu__controls__dropdown__title";

  return (
    <div className="menu">
      <div className="menu__controls">
        <Button darkMode={isDarkMode} onClick={() => setActive(true)}>
          Iniciar
        </Button>
        <Button darkMode={isDarkMode} onClick={() => setStep(true)}>
          Step
        </Button>
        <Button darkMode={isDarkMode} onClick={() => setActive(false)}>
          Detener
        </Button>
        <Button darkMode={isDarkMode} onClick={handleRestart}>
          Reiniciar
        </Button>
        <div className="menu__controls__dropdown">
          <span className={menuSelectTitleClassName}>Intervalo</span>
          <Dropdown
            className={btnClassName}
            darkMode={isDarkMode}
            name="speed"
            onChange={handleSetSpeed}
            selected={speed}
          >
            <DropdownOption value="100">100ms</DropdownOption>
            <DropdownOption value="300">300ms</DropdownOption>
            <DropdownOption value="600">600ms</DropdownOption>
            <DropdownOption value="1000">1000ms</DropdownOption>
          </Dropdown>
        </div>
        <div className="menu__controls__dropdown">
          <span className={menuSelectTitleClassName}>Tamaño</span>
          <Dropdown
            className={btnClassName}
            darkMode={isDarkMode}
            name="size"
            selected={selectedSize}
            onChange={setGridSize}
          >
            <DropdownOption value={GRID_SIZE.SMALL}>20x10</DropdownOption>
            <DropdownOption value={GRID_SIZE.MEDIUM}>50x30</DropdownOption>
            <DropdownOption value={GRID_SIZE.LARGE}>70x50</DropdownOption>
          </Dropdown>
        </div>
        <Button
          darkMode={isDarkMode}
          name={"oscillators"}
          onClick={(e) => {
            setPattern(e.target.name);
          }}
        >
          Oscillators
        </Button>
        <Button
          darkMode={isDarkMode}
          name={"spaceships"}
          onClick={(e) => {
            setPattern(e.target.name);
          }}
        >
          Spaceships
        </Button>

        <Button
          darkMode={isDarkMode}
          name={"storage"}
          onClick={handleDataStorage}
        >
          Guardar
        </Button>

        <Button
          darkMode={isDarkMode}
          name={"lastPattern"}
          onClick={handleLoadLastPattern}
        >
          Ultimo patrón
        </Button>

        <Button
          darkMode={isDarkMode}
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </Button>
      </div>
      <h2 className="menu__title">Generación # {data.generation}</h2>
    </div>
  );
}
