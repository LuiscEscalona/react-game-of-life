import React, { useContext } from "react";
import "./styles.scss";

// Por motivo de reusabilidad y extensibilidad se crea un componente
// dropdown, y para tener una implementacion mas limpia del componente
// se hace uso de context para no pasar de forma redundante props a las options
const DropdownContext = React.createContext();

function DropdownOption(props) {
  const { children, value } = props;
  const { selected } = useContext(DropdownContext);
  const isSelected = selected === value;

  return (
    <option className="dropdown__option" selected={isSelected} value={value}>
      {children}
    </option>
  );
}

function Dropdown(props) {
  const { children, darkMode, name, onChange, selected } = props;
  const dropdownClassName = darkMode ? "dropdown dropdown--dark" : "dropdown";

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <DropdownContext.Provider value={{ selected }}>
      <select className={dropdownClassName} name={name} onChange={handleChange}>
        {children}
      </select>
    </DropdownContext.Provider>
  );
}

export { Dropdown, DropdownOption };
