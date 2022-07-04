import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import { Home, Main, PageNotFound } from "./pages";
import "./App.scss";

export default function App() {
  const { isDarkMode } = useContext(AppContext);
  const appClassName = isDarkMode ? "app app--dark" : "app";

  return (
    <div className={appClassName}>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="main" element={<Main />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}
