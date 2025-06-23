import React, {Component} from 'react';
import Node from './Node/Node';
import {dijkstra, getNodesInShortestPathOrder} from '../algorithms/dijkstra';
import {astar, getNodesInShortestPathOrder as getAstarPath} from '../algorithms/astar';
import {bfs, getNodesInShortestPathOrder as getBfsPath} from '../algorithms/bfs';
import {dfs, getNodesInShortestPathOrder as getDfsPath} from '../algorithms/dfs';
import {greedyBestFirst, getNodesInShortestPathOrder as getGreedyPath} from '../algorithms/greedyBestFirst';
import {bidirectionalSearch, getNodesInShortestPathOrder as getBidirectionalPath} from '../algorithms/bidirectional';
import { GridNode, Grid, AlgorithmMetric, TerrainType } from '../types';
import { getTerrainWeight, getTerrainName } from '../utils/terrain';

import './PathfindingVisualizer.css';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

interface PathfindingVisualizerState {
  grid: Grid;
  mouseIsPressed: boolean;
  algorithmMetrics: AlgorithmMetric[];
  isDraggingStart: boolean;
  isDraggingFinish: boolean;
  startNodeRow: number;
  startNodeCol: number;
  finishNodeRow: number;
  finishNodeCol: number;
  selectedTerrain: TerrainType;
}

export default class PathfindingVisualizer extends Component<{}, PathfindingVisualizerState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      grid: [],
      mouseIsPressed: false,
      algorithmMetrics: [],
      isDraggingStart: false,
      isDraggingFinish: false,
      startNodeRow: START_NODE_ROW,
      startNodeCol: START_NODE_COL,
      finishNodeRow: FINISH_NODE_ROW,
      finishNodeCol: FINISH_NODE_COL,
      selectedTerrain: TerrainType.WALL,
    };
  }

  componentDidMount(): void {
    const grid = getInitialGrid();
    this.setState({grid});
  }

  handleMouseDown(row: number, col: number): void {
    const { grid, startNodeRow, startNodeCol, finishNodeRow, finishNodeCol, selectedTerrain } = this.state;
    
    if (row === startNodeRow && col === startNodeCol) {
      this.setState({ isDraggingStart: true, mouseIsPressed: true });
    } else if (row === finishNodeRow && col === finishNodeCol) {
      this.setState({ isDraggingFinish: true, mouseIsPressed: true });
    } else {
      const newGrid = getNewGridWithTerrainToggled(grid, row, col, selectedTerrain);
      this.setState({ grid: newGrid, mouseIsPressed: true });
    }
  }

  handleMouseEnter(row: number, col: number): void {
    const { mouseIsPressed, isDraggingStart, isDraggingFinish, grid, selectedTerrain } = this.state;
    
    if (!mouseIsPressed) return;
    
    if (isDraggingStart) {
      this.moveStartNode(row, col);
    } else if (isDraggingFinish) {
      this.moveFinishNode(row, col);
    } else {
      const newGrid = getNewGridWithTerrainToggled(grid, row, col, selectedTerrain);
      this.setState({ grid: newGrid });
    }
  }

  handleMouseUp(): void {
    this.setState({
      mouseIsPressed: false,
      isDraggingStart: false,
      isDraggingFinish: false,
    });
  }

  animateDijkstra(visitedNodesInOrder: GridNode[], nodesInShortestPathOrder: GridNode[]): void {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const element = document.getElementById(`node-${node.row}-${node.col}`);
        if (element) element.className = 'node node-visited';
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder: GridNode[]): void {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        const element = document.getElementById(`node-${node.row}-${node.col}`);
        if (element) element.className = 'node node-shortest-path';
      }, 50 * i);
    }
  }

  animateAstar(visitedNodesInOrder: GridNode[], nodesInShortestPathOrder: GridNode[]): void {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const element = document.getElementById(`node-${node.row}-${node.col}`);
        if (element) element.className = 'node node-visited';
      }, 10 * i);
    }
  }

  animateBfs(visitedNodesInOrder: GridNode[], nodesInShortestPathOrder: GridNode[]): void {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const element = document.getElementById(`node-${node.row}-${node.col}`);
        if (element) element.className = 'node node-visited';
      }, 10 * i);
    }
  }

  animateDfs(visitedNodesInOrder: GridNode[], nodesInShortestPathOrder: GridNode[]): void {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const element = document.getElementById(`node-${node.row}-${node.col}`);
        if (element) element.className = 'node node-visited';
      }, 10 * i);
    }
  }

  animateGreedy(visitedNodesInOrder: GridNode[], nodesInShortestPathOrder: GridNode[]): void {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const element = document.getElementById(`node-${node.row}-${node.col}`);
        if (element) element.className = 'node node-visited';
      }, 10 * i);
    }
  }

  animateBidirectional(visitedNodesInOrder: GridNode[], nodesInShortestPathOrder: GridNode[]): void {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const element = document.getElementById(`node-${node.row}-${node.col}`);
        if (element) element.className = 'node node-visited';
      }, 10 * i);
    }
  }

  recordMetrics(algorithmName: string, visitedNodes: GridNode[], pathNodes: GridNode[], executionTime: number): void {
    const metric: AlgorithmMetric = {
      algorithm: algorithmName,
      nodesVisited: visitedNodes.length,
      pathLength: pathNodes.length,
      executionTime: Math.round(executionTime * 100) / 100,
      timestamp: new Date().toLocaleTimeString()
    };
    
    this.setState(prevState => ({
      algorithmMetrics: [...prevState.algorithmMetrics, metric]
    }));
  }

  clearMetrics(): void {
    this.setState({algorithmMetrics: []});
  }

  moveStartNode(row: number, col: number): void {
    const { grid, finishNodeRow, finishNodeCol } = this.state;
    
    if (row === finishNodeRow && col === finishNodeCol) return;
    if (grid[row][col].terrain === TerrainType.WALL) return;
    
    const newGrid = this.updateNodePositions(grid, row, col, true);
    this.setState({
      grid: newGrid,
      startNodeRow: row,
      startNodeCol: col,
    });
  }

  moveFinishNode(row: number, col: number): void {
    const { grid, startNodeRow, startNodeCol } = this.state;
    
    if (row === startNodeRow && col === startNodeCol) return;
    if (grid[row][col].terrain === TerrainType.WALL) return;
    
    const newGrid = this.updateNodePositions(grid, row, col, false);
    this.setState({
      grid: newGrid,
      finishNodeRow: row,
      finishNodeCol: col,
    });
  }

  updateNodePositions(grid: Grid, newRow: number, newCol: number, isStart: boolean): Grid {
    const { startNodeRow, startNodeCol, finishNodeRow, finishNodeCol } = this.state;
    const newGrid = grid.map(row => row.map(node => ({ ...node })));
    
    if (isStart) {
      newGrid[startNodeRow][startNodeCol].isStart = false;
      newGrid[newRow][newCol].isStart = true;
    } else {
      newGrid[finishNodeRow][finishNodeCol].isFinish = false;
      newGrid[newRow][newCol].isFinish = true;
    }
    
    return newGrid;
  }

  visualizeDijkstra(): void {
    const { grid, startNodeRow, startNodeCol, finishNodeRow, finishNodeCol } = this.state;
    const startNode = grid[startNodeRow][startNodeCol];
    const finishNode = grid[finishNodeRow][finishNodeCol];
    
    const startTime = performance.now();
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    const endTime = performance.now();
    
    this.recordMetrics('Dijkstra', visitedNodesInOrder, nodesInShortestPathOrder, endTime - startTime);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualizeAstar(): void {
    const { grid, startNodeRow, startNodeCol, finishNodeRow, finishNodeCol } = this.state;
    const startNode = grid[startNodeRow][startNodeCol];
    const finishNode = grid[finishNodeRow][finishNodeCol];
    
    const startTime = performance.now();
    const visitedNodesInOrder = astar(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getAstarPath(finishNode);
    const endTime = performance.now();
    
    this.recordMetrics('A*', visitedNodesInOrder, nodesInShortestPathOrder, endTime - startTime);
    this.animateAstar(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualizeBfs(): void {
    const { grid, startNodeRow, startNodeCol, finishNodeRow, finishNodeCol } = this.state;
    const startNode = grid[startNodeRow][startNodeCol];
    const finishNode = grid[finishNodeRow][finishNodeCol];
    
    const startTime = performance.now();
    const visitedNodesInOrder = bfs(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getBfsPath(finishNode);
    const endTime = performance.now();
    
    this.recordMetrics('BFS', visitedNodesInOrder, nodesInShortestPathOrder, endTime - startTime);
    this.animateBfs(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualizeDfs(): void {
    const { grid, startNodeRow, startNodeCol, finishNodeRow, finishNodeCol } = this.state;
    const startNode = grid[startNodeRow][startNodeCol];
    const finishNode = grid[finishNodeRow][finishNodeCol];
    
    const startTime = performance.now();
    const visitedNodesInOrder = dfs(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getDfsPath(finishNode);
    const endTime = performance.now();
    
    this.recordMetrics('DFS', visitedNodesInOrder, nodesInShortestPathOrder, endTime - startTime);
    this.animateDfs(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualizeGreedy(): void {
    const { grid, startNodeRow, startNodeCol, finishNodeRow, finishNodeCol } = this.state;
    const startNode = grid[startNodeRow][startNodeCol];
    const finishNode = grid[finishNodeRow][finishNodeCol];
    
    const startTime = performance.now();
    const visitedNodesInOrder = greedyBestFirst(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getGreedyPath(finishNode);
    const endTime = performance.now();
    
    this.recordMetrics('Greedy Best-First', visitedNodesInOrder, nodesInShortestPathOrder, endTime - startTime);
    this.animateGreedy(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualizeBidirectional(): void {
    const { grid, startNodeRow, startNodeCol, finishNodeRow, finishNodeCol } = this.state;
    const startNode = grid[startNodeRow][startNodeCol];
    const finishNode = grid[finishNodeRow][finishNodeCol];
    
    const startTime = performance.now();
    const result = bidirectionalSearch(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getBidirectionalPath(result, startNode, finishNode);
    const endTime = performance.now();
    
    this.recordMetrics('Bidirectional Search', result.visitedNodesInOrder, nodesInShortestPathOrder, endTime - startTime);
    this.animateBidirectional(result.visitedNodesInOrder, nodesInShortestPathOrder);
  }

  render() {
    const {grid, mouseIsPressed, algorithmMetrics} = this.state;

    return (
      <>
        <div className="controls">
          <div className="terrain-selector">
            <label htmlFor="terrain-select">Terrain: </label>
            <select 
              id="terrain-select"
              value={this.state.selectedTerrain} 
              onChange={(e) => this.setState({ selectedTerrain: e.target.value as TerrainType })}
            >
              {Object.values(TerrainType).map(terrain => (
                <option key={terrain} value={terrain}>
                  {getTerrainName(terrain)}
                </option>
              ))}
            </select>
          </div>
          <button onClick={() => this.visualizeDijkstra()}>
            Visualize Dijkstra's Algorithm
          </button>
          <button onClick={() => this.visualizeAstar()}>
            Visualize A* Algorithm
          </button>
          <button onClick={() => this.visualizeBfs()}>
            Visualize BFS Algorithm
          </button>
          <button onClick={() => this.visualizeDfs()}>
            Visualize DFS Algorithm
          </button>
          <button onClick={() => this.visualizeGreedy()}>
            Visualize Greedy Best-First
          </button>
          <button onClick={() => this.visualizeBidirectional()}>
            Visualize Bidirectional Search
          </button>
          <button onClick={() => this.clearMetrics()}>
            Clear Metrics
          </button>
        </div>
        
        {algorithmMetrics.length > 0 && (
          <div className="metrics-container">
            <h3>Algorithm Performance Comparison</h3>
            <table className="metrics-table">
              <thead>
                <tr>
                  <th>Algorithm</th>
                  <th>Nodes Visited</th>
                  <th>Path Length</th>
                  <th>Execution Time (ms)</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {algorithmMetrics.map((metric, index) => (
                  <tr key={index}>
                    <td>{metric.algorithm}</td>
                    <td>{metric.nodesVisited}</td>
                    <td>{metric.pathLength}</td>
                    <td>{metric.executionTime}</td>
                    <td>{metric.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {row, col, isFinish, isStart, isWall, terrain} = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      terrain={terrain}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}></Node>
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

const getInitialGrid = (): Grid => {
  const grid: Grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow: GridNode[] = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col: number, row: number): GridNode => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    totalDistance: Infinity,
    heuristic: Infinity,
    isVisited: false,
    isWall: false,
    terrain: TerrainType.NORMAL,
    weight: getTerrainWeight(TerrainType.NORMAL),
    previousNode: null,
  };
};

const getNewGridWithTerrainToggled = (grid: Grid, row: number, col: number, terrain: TerrainType): Grid => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  
  if (node.isStart || node.isFinish) return newGrid;
  
  const newNode: GridNode = {
    ...node,
    terrain: terrain,
    weight: getTerrainWeight(terrain),
    isWall: terrain === TerrainType.WALL,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
