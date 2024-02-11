import React, { Component } from "react";
import Node from "./Node/Node";
import { dijkstra, getNodesInShortestPathOrder } from "../Algorithms/dijkstra";
import styled from "styled-components";
import { useEffect } from "react";
import "./PathfindingVisualiser.css";

const Button = styled.button`
  background-color: #3949ab;
  color: white;
  padding: 5px 15px;
  border-radius: 5px;
  outline: 0;
  box-shadow: 0px 2px 2px lightgrey;
`;

// let START_NODE_ROW = 0;
// let START_NODE_COL = 0;
let FINISH_NODE_ROW = 12; //change to inputted user values
let FINISH_NODE_COL = 30; //change to inputted user values

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      START_NODE_ROW: 0,
      START_NODE_COL: 0,
      grid: [],
      mouseIsPressed: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  getInitialGrid() {
    const grid = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        currentRow.push(this.createNode(col, row));
      }
      grid.push(currentRow);
    }
    return grid;
  }

  createNode(col, row) {
    console.log("Start row: ", this.state.START_NODE_ROW);
    console.log("Start col: ", this.state.START_NODE_COL);
    return {
      col,
      row,
      isStart:
        row === this.state.START_NODE_ROW && col === this.state.START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    };
  }

  getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ grid: this.getInitialGrid() });
    }, 5000);
    console.log("Initial grid being called");
  }

  handleMouseDown(row, col) {
    const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 25 * i);
    }
  }

  visualizeDijkstra() {
    const { grid } = this.state;
    const startNode =
      grid[this.state.START_NODE_ROW][this.state.START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  handleChange = (event) => {
    console.log("handleSubmit ran");
    let name = event.target.name;
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { grid, mouseIsPressed } = this.state;

    return (
      <>
        <div className="titlePage">
          <h1>Algorithm Visualiser</h1>
        </div>
        <div className="inputFields">
          <form onSubmit={this.handleChange}>
            <label>Enter Start Row:</label>
            <input
              type="number"
              name="START_NODE_ROW"
              required
              value={this.state.START_NODE_ROW}
              placeholder="Enter value between 0-50 "
              onChange={this.handleChange}
            ></input>
            <label>Enter Start Column:</label>
            <input
              type="number"
              name="START_NODE_COL"
              required
              value={this.state.START_NODE_COL}
              placeholder="Enter value between 0-40 "
              onChange={this.handleChange}
            ></input>
            <select>
              <option value="dijkstra">Dijkstra's Algorithm</option>
              <option value="bfs">Breadth-First Search</option>
              <option value="bfs">Depth-First Search</option>
            </select>
            <button type="submit">Submit</button>
          </form>
        </div>

        <div className="startButton">
          {" "}
          <Button onClick={() => this.visualizeDijkstra()}>
            Visualize Algorithm
          </Button>
        </div>
        <h4>Your start row number is: {this.state.START_NODE_ROW}</h4>
        <h4>Your start column number is: {this.state.START_NODE_COL}</h4>

        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, isFinish, isStart, isWall } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
