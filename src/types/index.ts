// Node interface for the grid
export interface GridNode {
  col: number;
  row: number;
  isStart: boolean;
  isFinish: boolean;
  distance: number;
  totalDistance: number;
  heuristic: number;
  isVisited: boolean;
  isWall: boolean;
  previousNode: GridNode | null;
}

// Algorithm metrics interface
export interface AlgorithmMetric {
  algorithm: string;
  nodesVisited: number;
  pathLength: number;
  executionTime: number;
  timestamp: string;
}

// Node component props
export interface NodeProps {
  col: number;
  row: number;
  isFinish: boolean;
  isStart: boolean;
  isWall: boolean;
  mouseIsPressed: boolean;
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  onMouseUp: () => void;
}

// Grid type
export type Grid = GridNode[][];