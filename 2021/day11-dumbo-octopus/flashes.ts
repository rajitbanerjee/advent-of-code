#!/usr/bin/env ts-node
import { splitAllLinesAsNumberBy } from "@utils";
import * as _ from "lodash";

const size = 10;
const main = () => {
  const grid: number[][] = splitAllLinesAsNumberBy("day11.in", "");
  const [a, b] = ["Part 1", "Part 2"];
  console.time(a);
  console.timeLog(a, simulate(_.cloneDeep(grid), 100));
  console.time(b);
  console.timeLog(b, simulate(grid));
};

const simulate = (grid: number[][], steps?: number): number => {
  for (let i = 1, total = 0; ; i++) {
    performStep(grid);
    const flashes = _.countBy(_.flatten(grid))[0];
    if (flashes) total += flashes;
    if (i === steps) return total;
    if (flashes === size ** 2) return i;
  }
};

const performStep = (grid: number[][]): void => {
  grid.forEach((row, i) => row.forEach((_, j) => grid[i][j]++));
  grid.forEach((row, i) => row.forEach((_, j) => flash(grid, i, j)));
};

const flash = (grid: number[][], i: number, j: number): void => {
  // Flash if energy > 9
  if (grid[i][j] <= 9) return;
  grid[i][j] = 0;
  // Increase neighbours' energy by 1
  [i - 1, i, i + 1].forEach((x) => {
    [j - 1, j, j + 1].forEach((y) => {
      if (isValid(x, y) && grid[x][y]) {
        grid[x][y]++;
        flash(grid, x, y);
      }
    });
  });
};

const isValid = (i: number, j: number): boolean => _.inRange(i, size) && _.inRange(j, size);

if (require.main === module) main();
