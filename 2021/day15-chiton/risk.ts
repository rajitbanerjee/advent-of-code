#!/usr/bin/env ts-node
import { createMatrix, defaultdict, NumberDict, splitAllLinesAsNumberBy } from "@utils";
import { find_path } from "dijkstrajs";
import * as _ from "lodash";

// Part 1
const lowestTotalRisk = (cave: number[][]): number => {
  const [rows, cols] = [cave.length, cave[0].length];
  const graph = matrixToEdgeMap(cave, rows, cols);
  // Why re-invent the wheel? https://www.npmjs.com/package/dijkstrajs
  const shortestPath = find_path(graph, str(0, 0), str(rows - 1, cols - 1));
  return _.sumBy(shortestPath.slice(1), (s: string) => {
    const [x, y] = s.split(",").map(Number);
    return cave[x][y];
  });
};

const matrixToEdgeMap = (matrix: number[][], rows: number, cols: number): { [vertex: string]: NumberDict } => {
  const edgeMap = defaultdict({});
  _.range(rows).forEach((i) => {
    _.range(cols).forEach((j) => {
      neighbourIndices(i, j, rows, cols).forEach(([x, y]) => {
        edgeMap[str(i, j)][str(x, y)] = matrix[x][y];
      });
    });
  });
  return edgeMap;
};

const neighbourIndices = (i: number, j: number, rows: number, cols: number) => {
  const isValid = ([x, y]) => _.inRange(x, rows) && _.inRange(y, cols);
  return [
    [i + 1, j],
    [i, j + 1],
    [i - 1, j],
    [i, j - 1],
  ].filter(isValid);
};

const str = (i: number, j: number) => i + "," + j;

// Part 2
const expand = (cave: number[][], times: number): number[][] => {
  const [rows, cols] = [cave.length, cave[0].length];
  const [largeRows, largeCols] = [rows * times, cols * times];
  const largeCave: number[][] = createMatrix(0, largeRows, largeCols);

  _.range(largeRows).forEach((i) => {
    _.range(largeCols).forEach((j) => {
      const risk = cave[i % rows][j % cols] + Math.floor(i / rows) + Math.floor(j / cols);
      largeCave[i][j] = ((risk - 1) % 9) + 1;
    });
  });
  return largeCave;
};

if (require.main === module) {
  const cave: number[][] = splitAllLinesAsNumberBy("day15.in", "");
  const largeCave: number[][] = expand(cave, 5);
  const [a, b] = ["Part 1", "Part 2"];
  console.time(a);
  console.timeLog(a, lowestTotalRisk(cave));
  console.time(b);
  console.timeLog(b, lowestTotalRisk(largeCave));
}
