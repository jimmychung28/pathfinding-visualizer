// Terrain types with their movement costs
export enum TerrainType {
  NORMAL = 'normal',
  FOREST = 'forest',
  WATER = 'water',
  MOUNTAIN = 'mountain',
  SAND = 'sand',
  WALL = 'wall'
}

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
  terrain: TerrainType;
  weight: number;
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
  terrain: TerrainType;
  mouseIsPressed: boolean;
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  onMouseUp: () => void;
}

// Grid type
export type Grid = GridNode[][];