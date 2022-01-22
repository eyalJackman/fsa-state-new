import { useState } from "react";
import SubmitButton from "./UI/SubmitButton.styled";

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
    <div className="Flow-controlsID">
      <form onSubmit={moveHandler}>
        <label>Start State</label>
        <input
          type="text"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
        <label>Input String</label>
        <input
          value={inputStr}
          onChange={(str) => setInputStr(str.target.value)}
          type="text"
        />
        <SubmitButton type="submit" />
      </form>
    </div>
  );
};

export default FSATrans;
