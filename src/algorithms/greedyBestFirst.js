// Performs Greedy Best-First Search algorithm; returns *all* nodes in the order
// in which they were visited. Uses only heuristic (h) to guide search,
// making it faster than A* but not guaranteed to find the optimal path.
export function greedyBestFirst(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.heuristic = heuristic(startNode, finishNode);
  const unvisitedNodes = [startNode];
  
  while (!!unvisitedNodes.length) {
    sortNodesByHeuristic(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    
    // If we encounter a wall, we skip it.
    if (closestNode.isWall) continue;
    
    // If we've already visited this node, skip it
    if (closestNode.isVisited) continue;
    
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    
    if (closestNode === finishNode) return visitedNodesInOrder;
    
    updateUnvisitedNeighbors(closestNode, grid, finishNode, unvisitedNodes);
  }
  
  return visitedNodesInOrder;
}

function sortNodesByHeuristic(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.heuristic - nodeB.heuristic);
}

function updateUnvisitedNeighbors(node, grid, finishNode, unvisitedNodes) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    if (!neighbor.isVisited && !neighbor.isWall) {
      neighbor.heuristic = heuristic(neighbor, finishNode);
      neighbor.previousNode = node;
      unvisitedNodes.push(neighbor);
    }
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const {col, row} = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

// Manhattan distance heuristic - same as A* but this is the ONLY factor used
function heuristic(nodeA, nodeB) {
  const dx = Math.abs(nodeA.row - nodeB.row);
  const dy = Math.abs(nodeA.col - nodeB.col);
  return dx + dy;
}

// Backtracks from the finishNode to find the path.
// Only works when called *after* the greedyBestFirst method above.
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}