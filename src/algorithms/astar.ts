import { GridNode, Grid } from '../types';

// Performs A* algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
export function astar(grid: Grid, startNode: GridNode, finishNode: GridNode): GridNode[] {
  const visitedNodesInOrder: GridNode[] = [];
  startNode.distance = 0;
  startNode.totalDistance = 0;
  const unvisitedNodes = getAllNodes(grid);
  
  while (!!unvisitedNodes.length) {
    sortNodesByTotalDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    
    // If we encounter a wall, we skip it.
    if (closestNode!.isWall) continue;
    
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode!.distance === Infinity) return visitedNodesInOrder;
    
    closestNode!.isVisited = true;
    visitedNodesInOrder.push(closestNode!);
    
    if (closestNode === finishNode) return visitedNodesInOrder;
    
    updateUnvisitedNeighbors(closestNode!, grid, finishNode);
  }
  return visitedNodesInOrder;
}

function sortNodesByTotalDistance(unvisitedNodes: GridNode[]): void {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.totalDistance - nodeB.totalDistance);
}

function updateUnvisitedNeighbors(node: GridNode, grid: Grid, finishNode: GridNode): void {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    const tentativeDistance = node.distance + neighbor.weight;
    if (tentativeDistance < neighbor.distance) {
      neighbor.distance = tentativeDistance;
      neighbor.totalDistance = tentativeDistance + heuristic(neighbor, finishNode);
      neighbor.previousNode = node;
    }
  }
}

function getUnvisitedNeighbors(node: GridNode, grid: Grid): GridNode[] {
  const neighbors: GridNode[] = [];
  const {col, row} = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getAllNodes(grid: Grid): GridNode[] {
  const nodes: GridNode[] = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

// Manhattan distance heuristic
function heuristic(nodeA: GridNode, nodeB: GridNode): number {
  const dx = Math.abs(nodeA.row - nodeB.row);
  const dy = Math.abs(nodeA.col - nodeB.col);
  return dx + dy;
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the astar method above.
export function getNodesInShortestPathOrder(finishNode: GridNode): GridNode[] {
  const nodesInShortestPathOrder: GridNode[] = [];
  let currentNode: GridNode | null = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}