#!/usr/bin/env ts-node

import { sum, splitAllLinesAsNumberBy, prod } from "@utils";

const main = () => {
  const heightmap: number[][] = splitAllLinesAsNumberBy("day09.in", "");
  console.log(`Part 1: ${sumLowRiskLevels(heightmap)}`);
  console.log(`Part 2: ${prodThreeLargestBasins(heightmap)}`);
};

const sumLowRiskLevels = (heightmap: number[][]): number =>
  sum(heightmap.map((row, i) => row.map((height, j) => (low(heightmap, i, j) ? height + 1 : 0))).flat(1));

const lowPoints: number[][] = [];
const low = (heightmap: number[][], i: number, j: number): boolean => {
  const locations = adjacent(heightmap, i, j);
  const isLow = sum(locations.map((e) => +(heightmap[i][j] < e))) === locations.length;
  if (isLow) lowPoints.push([i, j]);
  return isLow;
};

const adjacent = (heightmap: number[][], i: number, j: number): number[] => {
  const adjacentIndices = [
    [i + 1, j],
    [i - 1, j],
    [i, j + 1],
    [i, j - 1],
  ];
  return adjacentIndices.map(([a, b]) => (isValid(heightmap, a, b) ? heightmap[a][b] : -1)).filter((e) => e !== -1);
};

const isValid = (heightmap: number[][], i: number, j: number): boolean => {
  const [rows, cols] = [heightmap.length, heightmap[0].length];
  return 0 <= i && i < rows && 0 <= j && j < cols;
};

const prodThreeLargestBasins = (heightmap: number[][]): number => {
  const basins = lowPoints.map(([i, j]) => basinSize(heightmap, i, j)).sort((a, b) => a - b);
  return prod(basins.slice(-3));
};

const seen = new Set<string>();
const basinSize = (heightmap: number[][], i: number, j: number): number => {
  if (!isValid(heightmap, i, j) || heightmap[i][j] === 9 || seen.has(`${i},${j}`)) return 0;
  seen.add(`${i},${j}`);
  const adjacentIndices = [
    [i + 1, j],
    [i - 1, j],
    [i, j + 1],
    [i, j - 1],
  ];
  return 1 + sum(adjacentIndices.map(([a, b]) => basinSize(heightmap, a, b)));
};

if (require.main === module) main();
