import { GridNode, Grid } from '../types';

interface BidirectionalResult {
  visitedNodesInOrder: GridNode[];
  meetingPoint: GridNode | null;
  pathFound: boolean;
  forwardParents: Map<GridNode, GridNode | null>;
  backwardParents: Map<GridNode, GridNode | null>;
}

// Performs Bidirectional Search; returns *all* nodes in the order
// in which they were visited from both directions, plus the meeting point
export function bidirectionalSearch(grid: Grid, startNode: GridNode, finishNode: GridNode): BidirectionalResult {
  const visitedNodesInOrder: GridNode[] = [];
  const forwardQueue: GridNode[] = [startNode];
  const backwardQueue: GridNode[] = [finishNode];
  
  const forwardVisited = new Set<GridNode>();
  const backwardVisited = new Set<GridNode>();
  const forwardParents = new Map<GridNode, GridNode | null>();
  const backwardParents = new Map<GridNode, GridNode | null>();
  
  forwardParents.set(startNode, null);
  backwardParents.set(finishNode, null);
  forwardVisited.add(startNode);
  backwardVisited.add(finishNode);
  
  while (forwardQueue.length > 0 || backwardQueue.length > 0) {
    // Expand from start (forward search)
    if (forwardQueue.length > 0) {
      const currentNode = forwardQueue.shift()!;
      visitedNodesInOrder.push(currentNode);
      
      // Check if we've met the backward search
      if (backwardVisited.has(currentNode)) {
        return {
          visitedNodesInOrder,
          meetingPoint: currentNode,
          pathFound: true,
          forwardParents,
          backwardParents
        };
      }
      
      const neighbors = getUnvisitedNeighbors(currentNode, grid);
      for (const neighbor of neighbors) {
        if (!neighbor.isWall && !forwardVisited.has(neighbor)) {
          forwardParents.set(neighbor, currentNode);
          forwardVisited.add(neighbor);
          forwardQueue.push(neighbor);
          
          // Check if this neighbor was already visited by backward search
          if (backwardVisited.has(neighbor)) {
            visitedNodesInOrder.push(neighbor);
            return {
              visitedNodesInOrder,
              meetingPoint: neighbor,
              pathFound: true,
              forwardParents,
              backwardParents
            };
          }
        }
      }
    }
    
    // Expand from finish (backward search)
    if (backwardQueue.length > 0) {
      const currentNode = backwardQueue.shift()!;
      visitedNodesInOrder.push(currentNode);
      
      // Check if we've met the forward search
      if (forwardVisited.has(currentNode)) {
        return {
          visitedNodesInOrder,
          meetingPoint: currentNode,
          pathFound: true,
          forwardParents,
          backwardParents
        };
      }
      
      const neighbors = getUnvisitedNeighbors(currentNode, grid);
      for (const neighbor of neighbors) {
        if (!neighbor.isWall && !backwardVisited.has(neighbor)) {
          backwardParents.set(neighbor, currentNode);
          backwardVisited.add(neighbor);
          backwardQueue.push(neighbor);
          
          // Check if this neighbor was already visited by forward search
          if (forwardVisited.has(neighbor)) {
            visitedNodesInOrder.push(neighbor);
            return {
              visitedNodesInOrder,
              meetingPoint: neighbor,
              pathFound: true,
              forwardParents,
              backwardParents
            };
          }
        }
      }
    }
  }
  
  return {
    visitedNodesInOrder,
    meetingPoint: null,
    pathFound: false,
    forwardParents,
    backwardParents
  };
}

function getUnvisitedNeighbors(node: GridNode, grid: Grid): GridNode[] {
  const neighbors: GridNode[] = [];
  const {col, row} = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors;
}

// Special path reconstruction for bidirectional search
export function getNodesInShortestPathOrder(
  result: BidirectionalResult, 
  startNode: GridNode, 
  finishNode: GridNode
): GridNode[] {
  if (!result.meetingPoint || !result.pathFound) return [];
  
  // Build forward path from start to meeting point
  let currentNode: GridNode | null = result.meetingPoint;
  const forwardPath: GridNode[] = [];
  
  while (currentNode !== null) {
    forwardPath.unshift(currentNode);
    currentNode = result.forwardParents.get(currentNode) || null;
  }
  
  // Build backward path from meeting point to finish
  currentNode = result.backwardParents.get(result.meetingPoint) || null;
  const backwardPath: GridNode[] = [];
  
  while (currentNode !== null) {
    backwardPath.push(currentNode);
    currentNode = result.backwardParents.get(currentNode) || null;
  }
  
  // Combine paths
  return [...forwardPath, ...backwardPath];
}