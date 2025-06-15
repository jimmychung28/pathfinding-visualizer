import { GridNode, Grid } from '../types';

// Performs DFS algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the path
// by backtracking from the finish node.
export function dfs(grid: Grid, startNode: GridNode, finishNode: GridNode): GridNode[] {
  const visitedNodesInOrder: GridNode[] = [];
  const stack: GridNode[] = [startNode];
  
  while (stack.length > 0) {
    const currentNode = stack.pop()!;
    
    if (currentNode.isVisited || currentNode.isWall) continue;
    
    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);
    
    if (currentNode === finishNode) return visitedNodesInOrder;
    
    const neighbors = getUnvisitedNeighbors(currentNode, grid);
    for (const neighbor of neighbors) {
      if (!neighbor.isVisited && !neighbor.isWall && !neighbor.previousNode) {
        neighbor.previousNode = currentNode;
        stack.push(neighbor);
      }
    }
  }
  
  return visitedNodesInOrder;
}

function getUnvisitedNeighbors(node: GridNode, grid: Grid): GridNode[] {
  const neighbors: GridNode[] = [];
  const {col, row} = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

// Backtracks from the finishNode to find the path.
// Only works when called *after* the dfs method above.
export function getNodesInShortestPathOrder(finishNode: GridNode): GridNode[] {
  const nodesInShortestPathOrder: GridNode[] = [];
  let currentNode: GridNode | null = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}