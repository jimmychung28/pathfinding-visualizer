# Pathfinding Visualizer

A React-based interactive visualization tool for multiple pathfinding algorithms with advanced features including weighted terrain, moveable nodes, and hierarchical pathfinding.

## Features

- **Interactive grid** where you can paint different terrain types and obstacles
- **8 pathfinding algorithms**: Dijkstra's, A*, BFS, DFS, Greedy Best-First, Bidirectional Search, and Hierarchical Pathfinding
- **Weighted terrain system** with 6 terrain types having different movement costs
- **Moveable start/finish nodes** - drag them to new positions
- **Step-by-step visualization** of algorithm execution with smooth animations
- **Real-time performance metrics** comparing algorithm efficiency and optimality
- **Terrain selector** for painting different surface types on the grid

## How to Use

### Basic Navigation
1. **Select terrain type** from the dropdown (Wall, Normal, Forest, Water, Mountain, Sand)
2. **Paint terrain** by clicking and dragging on the grid
3. **Move start/finish nodes** by dragging the green (start) and red (finish) nodes to new positions
4. **Choose an algorithm** and click its button to start visualization
5. **Watch the animation** as nodes are explored (blue) and the final path is highlighted (yellow)
6. **Compare performance** using the metrics table below the grid

### Terrain Types & Movement Costs
- **Normal** (White) - 1x movement cost
- **Forest** (Green) - 2x movement cost  
- **Water** (Blue) - 3x movement cost
- **Mountain** (Brown) - 4x movement cost
- **Sand** (Tan) - 1.5x movement cost
- **Wall** (Black) - Impassable obstacle

### Algorithm Selection
- **Dijkstra's Algorithm** - Optimal, systematic exploration with weighted costs
- **A* Algorithm** - Optimal and efficient with heuristic guidance  
- **BFS Algorithm** - Optimal for unweighted scenarios, level-by-level exploration
- **DFS Algorithm** - Finds a path (not necessarily shortest), depth-first exploration
- **Greedy Best-First** - Fast but not optimal, heads directly toward goal
- **Bidirectional Search** - Searches from both ends simultaneously for faster results
- **Hierarchical Pathfinding** - Multi-level approach for efficient pathfinding on complex terrains

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

The visualizer implements 7 different pathfinding algorithms:

### **Dijkstra's Algorithm**
- **Optimal**: Guarantees the shortest path in weighted graphs
- **Approach**: Explores nodes in order of their distance from the start
- **Best for**: Weighted terrains where finding the absolute shortest path is critical
- **Time Complexity**: O((V + E) log V) where V is vertices and E is edges

### **A* Algorithm** 
- **Optimal**: Uses f(n) = g(n) + h(n) where g(n) = actual cost, h(n) = heuristic estimate
- **Approach**: More efficient than Dijkstra by using Manhattan distance heuristic to guide search
- **Best for**: Most scenarios requiring optimal paths with good performance
- **Time Complexity**: O(b^d) where b is branching factor and d is depth

### **Breadth-First Search (BFS)**
- **Optimal**: Guarantees shortest path in unweighted scenarios
- **Approach**: Explores nodes level by level using a queue (FIFO)
- **Best for**: Unweighted grids or when all movement costs are equal
- **Time Complexity**: O(V + E)

### **Depth-First Search (DFS)**
- **Non-optimal**: Finds a path but not necessarily the shortest
- **Approach**: Explores as far as possible along each branch using recursion/stack
- **Best for**: Maze generation or when any path will suffice
- **Time Complexity**: O(V + E)

### **Greedy Best-First Search**
- **Non-optimal**: Uses only heuristic h(n) to guide search toward goal
- **Approach**: Always moves toward the node that appears closest to the goal
- **Best for**: Quick pathfinding when approximate solutions are acceptable
- **Time Complexity**: O(b^m) where m is maximum depth

### **Bidirectional Search**
- **Optimal**: Searches simultaneously from start and goal until they meet
- **Approach**: Two search frontiers expand toward each other
- **Best for**: Long-distance pathfinding where it can significantly reduce search space
- **Time Complexity**: O(b^(d/2)) - roughly half the nodes of unidirectional search

### **Hierarchical Pathfinding**
- **Optimal**: Multi-level approach using coarse-to-fine pathfinding
- **Approach**: Plans path on coarse grid first, then refines with detailed pathfinding
- **Best for**: Large grids or complex terrain where preprocessing overhead pays off
- **Time Complexity**: O(n log n) preprocessing + O(k) where k is much smaller than full grid

## Performance Metrics

The visualizer tracks and displays comprehensive performance statistics for algorithm comparison:

### **Tracked Metrics**
- **Nodes Visited**: Total number of nodes explored by the algorithm
- **Path Length**: Number of nodes in the final path found
- **Execution Time**: Algorithm runtime in milliseconds
- **Timestamp**: When the algorithm was executed

### **Comparison Insights**
- **Efficiency**: Compare how many nodes different algorithms visit
- **Optimality**: See which algorithms find the shortest paths
- **Speed**: Observe execution time differences between algorithms
- **Consistency**: Run algorithms multiple times to see performance variation

### **Example Comparisons**
- **A* vs Dijkstra**: A* typically visits fewer nodes due to heuristic guidance
- **BFS vs DFS**: BFS guarantees shortest path, DFS may find suboptimal paths
- **Greedy vs A***: Greedy is faster but may miss optimal solutions
- **Algorithm Selection**: Choose the best algorithm based on your priorities (speed vs optimality)

## Grid Layout & Visual Elements

### **Node Types**
- **Green Node**: Start position (moveable by dragging)
- **Red Node**: Finish position (moveable by dragging)
- **White Nodes**: Normal terrain (1x movement cost)
- **Green Terrain**: Forest (2x movement cost)
- **Blue Terrain**: Water (3x movement cost)  
- **Brown Terrain**: Mountains (4x movement cost)
- **Tan Terrain**: Sand (1.5x movement cost)
- **Black Nodes**: Walls (impassable obstacles)

### **Animation States**
- **Blue Nodes**: Currently being explored by algorithm
- **Yellow Nodes**: Final optimal path found
- **Grab Cursor**: Indicates start/finish nodes can be dragged

### **Grid Specifications**
- **Size**: 20 rows × 50 columns (1000 total nodes)
- **Default Start**: Row 10, Column 15
- **Default Finish**: Row 10, Column 35
- **Terrain Painting**: Click and drag to paint selected terrain type

## Technical Implementation

### **Built With**
- **React 18.2.0** with **TypeScript 4.9.5** for type-safe component development
- **Create React App** (React Scripts 5.0.1) for build tooling and development environment
- **CSS3** for styling, animations, and responsive design
- **Custom algorithms** implemented in TypeScript with optimal data structures

### **Architecture Highlights**
- **Component-based design** with separation of concerns
- **State management** using React class components with comprehensive state tracking
- **Algorithm modularity** with each pathfinding algorithm in separate, testable modules
- **Performance monitoring** with real-time metrics collection and comparison
- **Weighted graph representation** supporting diverse terrain types and movement costs
- **Interactive UI** with drag-and-drop functionality and real-time visual feedback

## Recent Updates & Enhancements

### **✅ Completed Features**
- ✅ **Weighted terrain system** with 6 terrain types and variable movement costs
- ✅ **Moveable start/finish nodes** with drag-and-drop functionality  
- ✅ **Bidirectional Search** algorithm for improved performance on long paths
- ✅ **Hierarchical Pathfinding** with coarse-to-fine multi-level approach
- ✅ **Enhanced UI** with terrain selector and visual feedback
- ✅ **Performance metrics** with algorithm comparison table
- ✅ **TypeScript migration** for improved code quality and type safety

### **Future Enhancement Ideas**
- Jump Point Search (JPS) for optimized grid pathfinding
- Maze generation algorithms (Recursive Backtracking, Prim's, Cellular Automata)
- Adjustable grid size and animation speed controls
- Export metrics data to CSV/JSON formats
- Real-time performance graphs and charts
- 3D visualization mode
- Pathfinding with dynamic obstacles
- Multi-agent pathfinding scenarios