import React from "react";
import "./App.css";
import Flow from "./FSA/Flow";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <br />
      </header>
      <span
        style={{
          fontSize: "48px",
          fontWeight: "bold",
          color: "white",
          padding: "10px",
        }}
      >
        Finite State Automaton
      </span>
      <div className="App-div" style={{ backgroundColor: "darkgray" }}>
        <Flow />
      </div>
    </div>
  );
}

export default App;
