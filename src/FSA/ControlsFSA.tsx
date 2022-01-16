import React, { useState } from "react";
import EdgeAdder from "./EdgeAdder";
import "./Flow.css";

const ControlsFSA = (props: any) => {
  const [state, setState] = useState("");
  const stateNameHandler = (event: any) => setState(event.target.value);
  const newStateHandler = (event: any) => {
    event.preventDefault();
    props.onNewState(state);
    setState("");
  };

  const edgeHandler = (edgeA: string, edgeB: string, trans: string) => {
    props.onNewEdge(edgeA, edgeB, trans);
  };

  return (
    <div>
      <form onSubmit={newStateHandler}>
        <label>New State Creation</label>
        <input type="text" onChange={stateNameHandler} value={state} />
        <input type="submit" />
      </form>
      <button onClick={props.onClear}>Clear</button>
      <EdgeAdder onEdge={edgeHandler} />
    </div>
  );
};

export default ControlsFSA;
