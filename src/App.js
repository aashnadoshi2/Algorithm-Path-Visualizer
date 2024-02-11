import React from "react";
import "./App.css";
import PathfindingVisualiser from "./PathfindingVisualiser/PathfindingVisualiser";
import { useState } from "react";
import UserInput from "./UserInput/UserInput";

const App = () => {
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div className="App">
      {/* <UserInput></UserInput> */}
      <PathfindingVisualiser></PathfindingVisualiser>
    </div>
  );
};

export default App;
