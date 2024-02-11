import React, { Component } from "react";
import styled from "styled-components";
import "./UserInput.css";
import { useState } from "react";

const Button = styled.button`
  background-color: #3949ab;
  color: white;
  padding: 5px 15px;
  border-radius: 5px;
  outline: 0;
  box-shadow: 0px 2px 2px lightgrey;
`;

const UserInput = () => {
  const [startRow, setStartRow] = useState(0);
  const [startCol, setStartCol] = useState(0);
  const [endRow, setEndRow] = useState(0);
  const [endCol, setEndCol] = useState(0);

  return (
    <>
      <h1> Algorithm Visualiser</h1>
      <div className="userInput">
        <label>Enter Start Row:</label>
        <input
          type="number"
          required
          value={startRow}
          onChange={(e) => setStartRow(e.target.value)}
        />
        <label>Enter Start Col:</label>
        <input
          type="number"
          required
          value={startCol}
          onChange={(e) => setStartCol(e.target.value)}
        />
        <label>Enter End Row:</label>
        <input
          type="number"
          required
          value={endRow}
          onChange={(e) => setEndRow(e.target.value)}
        />
        <label>Enter End Col:</label>
        <input
          type="number"
          required
          value={endCol}
          onChange={(e) => setEndCol(e.target.value)}
        />
        <p> Start Row: {startRow} </p>
        <p> Start Col: {startCol} </p>
        <p> End Row: {endRow} </p>
        <p> End Col: {endCol} </p>
      </div>
    </>
  );
};

export default UserInput;
