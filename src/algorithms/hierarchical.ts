import { GridNode, Grid } from '../types';
import { dijkstra, getNodesInShortestPathOrder as getDijkstraPath } from './dijkstra';

interface HierarchicalResult {
  visitedNodesInOrder: GridNode[];
  pathFound: boolean;
}

// Simplified hierarchical pathfinding - uses coarse-to-fine approach
export function hierarchicalPathfinding(grid: Grid, startNode: GridNode, finishNode: GridNode): HierarchicalResult {
  const visitedNodesInOrder: GridNode[] = [];
  
  // Step 1: Create a coarse grid (every 4th node)
  const coarseGrid = createCoarseGrid(grid);
  const coarseStart = mapToCoarseGrid(startNode, coarseGrid);
  const coarseFinish = mapToCoarseGrid(finishNode, coarseGrid);
  
  if (!coarseStart || !coarseFinish) {
    // Fallback to regular dijkstra if coarse mapping fails
    const regularResult = dijkstra(grid, startNode, finishNode);
    return {
      visitedNodesInOrder: regularResult,
      pathFound: regularResult.length > 0
    };
  }
  
  // Step 2: Find coarse path
  const coarseVisited = dijkstra(coarseGrid, coarseStart, coarseFinish);
  const coarsePath = getDijkstraPath(coarseFinish);
  
  // Add coarse nodes to visited list (mapped back to original grid)
  for (const coarseNode of coarseVisited) {
    const originalNode = grid[coarseNode.row * 4] && grid[coarseNode.row * 4][coarseNode.col * 4];
    if (originalNode) {
      visitedNodesInOrder.push(originalNode);
    }
  }
  
  // Step 3: Refine path between coarse waypoints
  if (coarsePath.length > 1) {
    for (let i = 0; i < coarsePath.length - 1; i++) {
      const waypoint1 = grid[coarsePath[i].row * 4][coarsePath[i].col * 4];
      const waypoint2 = grid[coarsePath[i + 1].row * 4][coarsePath[i + 1].col * 4];
      
      // Find detailed path between waypoints
      const segmentVisited = dijkstra(grid, waypoint1, waypoint2);
      visitedNodesInOrder.push(...segmentVisited);
    }
  }
  
  return {
    visitedNodesInOrder,
    pathFound: coarsePath.length > 0
  };
}

// Create a coarse version of the grid (sample every 4th node)
function createCoarseGrid(originalGrid: Grid): Grid {
  const coarseGrid: Grid = [];
  const originalRows = originalGrid.length;
  const originalCols = originalGrid[0].length;
  
  for (let row = 0; row < originalRows; row += 4) {
    const coarseRow: GridNode[] = [];
    for (let col = 0; col < originalCols; col += 4) {
      const originalNode = originalGrid[row][col];
      
      // Create a new node for the coarse grid
      const coarseNode: GridNode = {
        ...originalNode,
        row: Math.floor(row / 4),
        col: Math.floor(col / 4),
        distance: Infinity,
        totalDistance: Infinity,
        heuristic: Infinity,
        isVisited: false,
        previousNode: null
      };
      
      coarseRow.push(coarseNode);
    }
    coarseGrid.push(coarseRow);
  }
  
  return coarseGrid;
}

// Map a node from original grid to coarse grid
function mapToCoarseGrid(originalNode: GridNode, coarseGrid: Grid): GridNode | null {
  const coarseRow = Math.floor(originalNode.row / 4);
  const coarseCol = Math.floor(originalNode.col / 4);
  
  if (coarseRow >= 0 && coarseRow < coarseGrid.length && 
      coarseCol >= 0 && coarseCol < coarseGrid[0].length) {
    return coarseGrid[coarseRow][coarseCol];
  }
  
  return null;
}

// Simplified path reconstruction that just uses the visited nodes  
export function getNodesInShortestPathOrder(
  result: HierarchicalResult,
  startNode: GridNode,
  finishNode: GridNode,
  grid: Grid
): GridNode[] {
  if (!result.pathFound) {
    return [];
  }
  
  // For hierarchical, we use regular dijkstra to get the final path
  dijkstra(grid, startNode, finishNode);
  const path: GridNode[] = [];
  let current: GridNode | null = finishNode;
  
  while (current !== null) {
    path.unshift(current);
    current = current.previousNode;
  }
  
  return path;
}