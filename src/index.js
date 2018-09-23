import React from "react";
import ReactDOM from "react-dom";
import PasswordScreen from "./PasswordScreen";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1 />
      <PasswordScreen />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
