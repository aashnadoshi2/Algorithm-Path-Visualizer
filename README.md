# Algorithm Path Visualizer

## Project Overview

Algorithm Path Visualizer is a React application designed to visualize various pathfinding algorithms in action. This project allows users to place start and end nodes on a grid, create walls and obstacles, and visualize how different algorithms traverse the grid to find the shortest path between two points.

## Features

- **Interactive Grid:** Users can interact with the grid by placing start and end nodes and creating walls to act as obstacles.
- **Algorithm Visualization:** Currently supports Dijkstra's algorithm, with plans to include more algorithms like Breadth-First Search (BFS) and Depth-First Search (DFS).
- **Real-time Interaction:** The application updates in real-time, allowing users to modify the grid and immediately see how changes affect the pathfinding.
- **Customizable Grid:** Users can specify the start and end positions, offering a personalized experience in testing pathfinding algorithms.

## How to Use

1. **Starting the Application:** Run `npm start` to launch the app in development mode. Open http://localhost:3000 to view it in your browser.
2. **Setting Up the Grid:** Click to place the start and end nodes. Drag to create walls.
3. **Choosing an Algorithm:** Select an algorithm from the dropdown menu.
4. **Visualizing the Algorithm:** Click the "Visualize Algorithm" button to start the visualization. Watch as the algorithm explores paths and finally highlights the shortest path.

## Available Scripts

In the project directory, you can run several scripts:

- `npm start` - Runs the app in development mode.
- `npm test` - Launches the test runner in the interactive watch mode.
- `npm run build` - Builds the app for production to the `build` folder.
- `npm run eject` - Removes the single build dependency from your project.

## Learn More

For more information on React and Create React App, refer to their [documentation](https://reactjs.org/).

## Deployment

Refer to the [Create React App deployment guide](https://facebook.github.io/create-react-app/docs/deployment) for details on deploying the application.

## Contributing

Contributions are welcome! Please feel free to submit pull requests with improvements or additional features.
