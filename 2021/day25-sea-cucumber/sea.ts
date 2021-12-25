#!/usr/bin/env ts-node
import { matrixToDict, splitAllLinesBy } from "@utils";
import * as _ from "lodash";

enum Region {
  EAST = ">",
  SOUTH = "v",
  EMPTY = ".",
}

let seafloor: { [key: string]: Region } = {};
const main = () => {
  const matrix: string[][] = splitAllLinesBy("day25.in", "");
  const [rows, cols] = [matrix.length, matrix[0].length];
  seafloor = matrixToDict(matrix);

  console.time("Part 1");
  console.timeLog("Part 1", moveTillConvergence(rows, cols));
};

const moveTillConvergence = (rows: number, cols: number): number => {
  let steps = 0;
  while (++steps) {
    let movedEast = moveEast(cols);
    let movedSouth = moveSouth(rows);
    if (!(movedEast || movedSouth)) break;
  }
  return steps;
};

const moveEast = (cols: number) => {
  return move(Region.EAST, (i: number, j: number) => [i, (j + 1) % cols]);
};

const moveSouth = (rows: number) => {
  return move(Region.SOUTH, (i: number, j: number) => [(i + 1) % rows, j]);
};

const move = (moving: Region, forward: (i: number, j: number) => [number, number]): boolean => {
  let moved = false;
  const newFloor = _.cloneDeep(seafloor);
  for (const [key, region] of Object.entries(seafloor)) {
    const [i, j] = ind(key);
    const next = str(...forward(i, j));
    if (region === moving && seafloor[next] === Region.EMPTY) {
      newFloor[next] = moving;
      newFloor[key] = Region.EMPTY;
      moved = true;
    }
  }
  seafloor = newFloor;
  return moved;
};

const str = (i: number, j: number) => i + "," + j;
const ind = (key: string) => key.split(",").map(Number);

if (require.main === module) main();
