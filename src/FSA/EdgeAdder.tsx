import React, { useState } from "react";

const EdgeAdder = (props: any) => {
  const [edgeA, setEdgeA] = useState("");
  const [edgeB, setEdgeB] = useState("");
  const [trans, setTrans] = useState("");

  return (
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
        type="text"
        value={edgeA}
        onChange={(e) => setEdgeA(e.target.value)}
      />
      to
      <input
        type="text"
        value={edgeB}
        onChange={(e) => setEdgeB(e.target.value)}
      />
      via
      <input
        type="text"
        value={trans}
        onChange={(e) => setTrans(e.target.value)}
      />
      <input type="submit" />
    </form>
  );
};

export default EdgeAdder;
