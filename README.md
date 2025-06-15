# Pathfinding Visualizer

A React-based interactive visualization tool for multiple pathfinding algorithms including Dijkstra's, A*, BFS, DFS, and Greedy Best-First Search.

## Features

- Interactive grid where you can draw walls by clicking and dragging
- Multiple pathfinding algorithms: Dijkstra's, A*, BFS, DFS, and Greedy Best-First Search
- Step-by-step visualization of algorithm execution
- Shows the path found by each algorithm (shortest for optimal algorithms)
- Predefined start and finish nodes
- Smooth animations for algorithm execution

## How to Use

1. Click and drag on the grid to create walls (black squares)
2. Choose an algorithm and click its button to start visualization:
   - **Dijkstra's Algorithm** - Optimal, explores systematically
   - **A* Algorithm** - Optimal and efficient with heuristic guidance
   - **BFS Algorithm** - Optimal for unweighted grids, level-by-level exploration
   - **DFS Algorithm** - Finds a path (not necessarily shortest), depth-first exploration
   - **Greedy Best-First** - Fast but not optimal, heads directly toward goal
3. Watch as the algorithm explores nodes (blue) and then highlights the path found (yellow)

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

The visualizer implements multiple pathfinding algorithms:

### **Dijkstra's Algorithm**
- Guarantees the shortest path in weighted graphs
- Explores nodes in order of their distance from the start
- Uses a priority queue approach to always visit the closest unvisited node

### **A* Algorithm**
- Optimal pathfinding algorithm using f(n) = g(n) + h(n)
- g(n) = actual distance from start, h(n) = heuristic distance to goal
- More efficient than Dijkstra's by using heuristic to guide search
- Uses Manhattan distance heuristic

### **Breadth-First Search (BFS)**
- Guarantees shortest path in unweighted graphs
- Explores nodes level by level using a queue (FIFO)
- Systematic exploration of all nodes at current depth before moving deeper

### **Depth-First Search (DFS)**
- Finds a path but not necessarily the shortest
- Explores as far as possible along each branch using a stack (LIFO)
- Can be inefficient for pathfinding but useful for maze generation

### **Greedy Best-First Search**
- Uses only heuristic h(n) to guide search toward goal
- Faster than A* but doesn't guarantee optimal path
- Can get trapped by obstacles due to greedy nature
- More direct approach but may miss better paths

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
- Additional pathfinding algorithms (Bidirectional Search, Jump Point Search, Theta*)
- Maze generation algorithms (Recursive Backtracking, Randomized Prim's, etc.)
- Adjustable grid size and animation speed
- Moveable start/finish nodes
- Weighted terrain costs
- Algorithm performance comparison metrics