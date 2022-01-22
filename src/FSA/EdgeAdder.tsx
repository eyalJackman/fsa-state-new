import React, { useState } from "react";
import "./EdgeAdder.css";
import "./Flow.css";
import styled from "styled-components";
import SubmitButton from "./UI/SubmitButton.styled";

const InputTrans = styled.input`
  box-shadow: 2px 2px 5px #333;
  width: 10%;
  height: 2.5em;
  border-radius: 15px;
`;

const EdgeAdder = (props: any) => {
  const [edgeA, setEdgeA] = useState("");
  const [edgeB, setEdgeB] = useState("");
  const [trans, setTrans] = useState("");

  return (
    <div className="item">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.onEdge(edgeA, edgeB, trans);
          setEdgeA("");
          setEdgeB("");
          setTrans("");
        }}
      >
        <label>New Transition Creation</label>
        <input
          className="rounded-input-text"
          type="text"
          value={edgeA}
          onChange={(e) => setEdgeA(e.target.value)}
        />
        <InputTrans
          type="text"
          value={trans}
          onChange={(e) => setTrans(e.target.value)}
        />
        <input
          className="rounded-input-text"
          type="text"
          value={edgeB}
          onChange={(e) => setEdgeB(e.target.value)}
        />
        <SubmitButton type="submit" />
      </form>
    </div>
  );
};

export default EdgeAdder;
