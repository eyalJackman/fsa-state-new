import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Flow from "./FSA/Flow";

function App() {
  const makeBr = (n: number): any => {
    let arr: any[] = [];
    const helper = (n: number) => {
      if (n > 0) {
        arr.push(<br key={n} />);
        helper(n - 1);
      }
    };
    helper(n);
    return arr;
  };

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
        {/* {makeBr(6)} */}
      </div>
    </div>
  );
}

export default App;
