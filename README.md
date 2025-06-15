# Pathfinding Visualizer

A React-based interactive visualization tool for pathfinding algorithms, currently featuring Dijkstra's shortest path algorithm.

## Features

- Interactive grid where you can draw walls by clicking and dragging
- Visualizes Dijkstra's algorithm step-by-step
- Shows the shortest path once the algorithm completes
- Predefined start and finish nodes
- Smooth animations for algorithm execution

## How to Use

1. Click and drag on the grid to create walls (black squares)
2. Click "Visualize Dijkstra's Algorithm" to start the visualization
3. Watch as the algorithm explores nodes (blue) and then highlights the shortest path (yellow)

## Getting Started

### Prerequisites

- Node.js (version 12 or higher)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Algorithm Details

The visualizer currently implements **Dijkstra's Algorithm**, which:
- Guarantees the shortest path in weighted graphs
- Explores nodes in order of their distance from the start
- Uses a priority queue approach to always visit the closest unvisited node

## Grid Layout

- **Green Node**: Start position (row 10, column 15)
- **Red Node**: Finish position (row 10, column 35)  
- **Black Nodes**: Walls (impassable obstacles)
- **Blue Nodes**: Visited during algorithm execution
- **Yellow Nodes**: Final shortest path

## Built With

- React 16.10.1
- Create React App
- CSS3 for styling and animations

## Future Enhancements

Potential additions could include:
- Additional pathfinding algorithms (A*, BFS, DFS)
- Adjustable grid size
- Moveable start/finish nodes
- Different maze generation patterns
- Speed controls for animations