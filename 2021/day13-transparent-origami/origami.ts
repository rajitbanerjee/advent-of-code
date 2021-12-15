#!/usr/bin/env ts-node
import { createMatrix, matrixToString, readAllLines } from "@utils";
import * as _ from "lodash";

const performFolds = (paper: string[][], folds: string[][], numFolds?: number) => {
  for (const [i, [axis, num]] of folds.entries()) {
    if (i === numFolds) break;
    if (axis === "y") foldUp(paper, +num);
    else foldLeft(paper, +num);
  }
  return countDots(paper);
};

const foldUp = (paper: string[][], along: number): void => {
  _.range(along + 1, paper.length).forEach((i) => {
    _.range(paper[0].length).forEach((j) => {
      if (paper[i][j] === "#") paper[2 * along - i][j] = "#";
      paper[i][j] = "";
    });
  });
};

const foldLeft = (paper: string[][], along: number): void => {
  _.range(paper.length).forEach((i) => {
    _.range(along + 1, paper[0].length).forEach((j) => {
      if (paper[i][j] === "#") paper[i][2 * along - j] = "#";
      paper[i][j] = "";
    });
  });
};

const countDots = (paper: string[][]): number => _.countBy(_.flatten(paper))["#"];

if (require.main === module) {
  const [cString, fString] = readAllLines("day13.in", "\n\n");
  const coords: number[][] = cString.split("\n").map((l) => l.split(",").map(Number));
  const folds: string[][] = fString.split("\n").map((l) => l.replace("fold along ", "").split("="));
  const paper: string[][] = createMatrix(".", _.max(_.flatten(coords)) + 1);
  coords.forEach(([i, j]) => (paper[j][i] = "#"));

  const [a, b] = ["Part 1", "Part 2"];
  console.time(a);
  console.timeLog(a, performFolds(_.cloneDeep(paper), folds, 1));
  console.time(b);
  console.timeLog(b, performFolds(paper, folds));
  console.log(matrixToString(paper).replace(/\./g, " ").trim());
}
