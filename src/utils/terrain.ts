import { TerrainType } from '../types';

export const TERRAIN_WEIGHTS: Record<TerrainType, number> = {
  [TerrainType.NORMAL]: 1,
  [TerrainType.FOREST]: 2,
  [TerrainType.WATER]: 3,
  [TerrainType.MOUNTAIN]: 4,
  [TerrainType.SAND]: 1.5,
  [TerrainType.WALL]: Infinity,
};

export const TERRAIN_NAMES: Record<TerrainType, string> = {
  [TerrainType.NORMAL]: 'Normal',
  [TerrainType.FOREST]: 'Forest (2x)',
  [TerrainType.WATER]: 'Water (3x)',
  [TerrainType.MOUNTAIN]: 'Mountain (4x)',
  [TerrainType.SAND]: 'Sand (1.5x)',
  [TerrainType.WALL]: 'Wall',
};

export const getTerrainWeight = (terrain: TerrainType): number => {
  return TERRAIN_WEIGHTS[terrain];
};

export const getTerrainName = (terrain: TerrainType): string => {
  return TERRAIN_NAMES[terrain];
};