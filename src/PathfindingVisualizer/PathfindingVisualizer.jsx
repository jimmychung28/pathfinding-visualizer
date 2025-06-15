import React, {Component} from 'react';
import Node from './Node/Node';
import {dijkstra, getNodesInShortestPathOrder} from '../algorithms/dijkstra';
import {astar, getNodesInShortestPathOrder as getAstarPath} from '../algorithms/astar';
import {bfs, getNodesInShortestPathOrder as getBfsPath} from '../algorithms/bfs';
import {dfs, getNodesInShortestPathOrder as getDfsPath} from '../algorithms/dfs';
import {greedyBestFirst, getNodesInShortestPathOrder as getGreedyPath} from '../algorithms/greedyBestFirst';

import './PathfindingVisualizer.css';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      algorithmMetrics: [],
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({grid});
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true});
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid});
  }

  handleMouseUp() {
    this.setState({mouseIsPressed: false});
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
          'node node-visited';
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }
  }

  animateAstar(visitedNodesInOrder, nodesInShortestPathOrder) {
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
          'node node-visited';
      }, 10 * i);
    }
  }

  animateBfs(visitedNodesInOrder, nodesInShortestPathOrder) {
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
          'node node-visited';
      }, 10 * i);
    }
  }

  animateDfs(visitedNodesInOrder, nodesInShortestPathOrder) {
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
          'node node-visited';
      }, 10 * i);
    }
  }

  animateGreedy(visitedNodesInOrder, nodesInShortestPathOrder) {
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
          'node node-visited';
      }, 10 * i);
    }
  }

  recordMetrics(algorithmName, visitedNodes, pathNodes, executionTime) {
    const metric = {
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

  clearMetrics() {
    this.setState({algorithmMetrics: []});
  }

  visualizeDijkstra() {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    
    const startTime = performance.now();
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    const endTime = performance.now();
    
    this.recordMetrics('Dijkstra', visitedNodesInOrder, nodesInShortestPathOrder, endTime - startTime);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualizeAstar() {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    
    const startTime = performance.now();
    const visitedNodesInOrder = astar(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getAstarPath(finishNode);
    const endTime = performance.now();
    
    this.recordMetrics('A*', visitedNodesInOrder, nodesInShortestPathOrder, endTime - startTime);
    this.animateAstar(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualizeBfs() {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    
    const startTime = performance.now();
    const visitedNodesInOrder = bfs(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getBfsPath(finishNode);
    const endTime = performance.now();
    
    this.recordMetrics('BFS', visitedNodesInOrder, nodesInShortestPathOrder, endTime - startTime);
    this.animateBfs(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualizeDfs() {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    
    const startTime = performance.now();
    const visitedNodesInOrder = dfs(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getDfsPath(finishNode);
    const endTime = performance.now();
    
    this.recordMetrics('DFS', visitedNodesInOrder, nodesInShortestPathOrder, endTime - startTime);
    this.animateDfs(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualizeGreedy() {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    
    const startTime = performance.now();
    const visitedNodesInOrder = greedyBestFirst(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getGreedyPath(finishNode);
    const endTime = performance.now();
    
    this.recordMetrics('Greedy Best-First', visitedNodesInOrder, nodesInShortestPathOrder, endTime - startTime);
    this.animateGreedy(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  render() {
    const {grid, mouseIsPressed, algorithmMetrics} = this.state;

    return (
      <>
        <div className="controls">
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
                  const {row, col, isFinish, isStart, isWall} = node;
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

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
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
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
