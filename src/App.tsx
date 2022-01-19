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
      <div className="App-div">
        <Flow />
        {/* {makeBr(6)} */}
      </div>
    </div>
  );
}

export default App;
