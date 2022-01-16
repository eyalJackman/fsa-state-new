import { useState } from "react";

const FSATrans = (props: any) => {
  const [inputStr, setInputStr] = useState("");
  const [start, setStart] = useState("");

  const moveHandler = (e: any) => {
    e.preventDefault();
    if (inputStr !== "" || start !== "") {
      props.onMove(inputStr, start) === false && alert("bad input");
    }
    setInputStr("");
    setStart("");
  };

  return (
    <form onSubmit={moveHandler}>
      <label>Input String</label>
      <input
        value={inputStr}
        onChange={(str) => setInputStr(str.target.value)}
        type="text"
      />
      <label>Start State</label>
      <input
        type="text"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />
      <input type="submit"></input>
    </form>
  );
};

export default FSATrans;
