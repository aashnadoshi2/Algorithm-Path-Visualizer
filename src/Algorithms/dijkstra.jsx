//Dijkstra's algorithm is performed here
//returns *all* nodes in the order in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path by backtracking from the finish node.

//Nodes have 2 properties: (mimics table for Dijkstra's algorithm)
//1. distance property
//2. previous Node

export function dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  const unvisitedNodes = getAllNodes(grid);
  startNode.distance = 0;
  while (!!unvisitedNodes.length) {
    //while length of array is not 0
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift(); //pop off first/closest node in array and return it
    // If we encounter a wall, we skip it.
    if (closestNode.isWall == true) continue;
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    //Otherwise we mark the current Node as visited and add it to visitedNodesInOrder list
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closestNode, grid);
  }
}

// We backtrack from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    //adds one or more elements to the beginning of an array and returns the new length of the array.
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

//Function
function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid); //we get list of unvisited nodeds (up, down, left, right)
  //loop through un unvisited nodes and set their distance and previousNode properties
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

//Function gets the unvisited neighbours
function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]); //Add bottom node
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); //Add top node
  if (col > 0) neighbors.push(grid[row][col - 1]); //Add left node
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); //Add right node
  return neighbors.filter((neighbor) => !neighbor.isVisited); //returns neightbours if not visited
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}
