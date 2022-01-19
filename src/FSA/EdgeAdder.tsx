import React, { useState } from "react";
import "./EdgeAdder.css";

const EdgeAdder = (props: any) => {
  const [edgeA, setEdgeA] = useState("");
  const [edgeB, setEdgeB] = useState("");
  const [trans, setTrans] = useState("");

  return (
    <div className="transitions">
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
        <div className="rightarrow">
          via
          <input
            type="text"
            value={trans}
            onChange={(e) => setTrans(e.target.value)}
          />
        </div>
        <input
          className="rounded-input-text"
          type="text"
          value={edgeB}
          onChange={(e) => setEdgeB(e.target.value)}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default EdgeAdder;
