import React, { useState } from "react";
import EdgeAdder from "./EdgeAdder";
import "./Flow.css";
import FSATrans from "./FSATrans";
import SubmitButton from "./UI/SubmitButton.styled";
import ClearButton from "./UI/ClearButton.styles";

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
    <div className="container">
      <div className="item">
        <form onSubmit={newStateHandler}>
          <label>New State Creation</label>
          <input type="text" onChange={stateNameHandler} value={state} />
          <SubmitButton type="submit" />
        </form>
      </div>
      <ClearButton className="item" onClick={props.onClear}>
        Clear
      </ClearButton>
      <EdgeAdder className="item" onEdge={edgeHandler} />
      <FSATrans
        className="item trans"
        elements={props.elements}
        onMove={props.onMove}
      />
    </div>
  );
};

export default ControlsFSA;
