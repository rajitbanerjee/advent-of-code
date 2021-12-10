#!/usr/bin/env ts-node
import { readAllLines, transpose2DMatrix } from "@utils";
import * as _ from "lodash";

const main = () => {
  const [drawOrder, boards] = parseInput("day04.in");
  console.log(`Part 1: ${getWinningScore(drawOrder, _.cloneDeep(boards), "first")}`);
  console.log(`Part 2: ${getWinningScore(drawOrder, boards, "last")}`);
};

type Entry = { item: number; mark: number };
const parseInput = (inFile: string): [number[], Entry[][][]] => {
  const lines = readAllLines(inFile, "\n\n");
  const drawOrder: number[] = lines[0].split(",").map(Number);
  const boards: Entry[][][] = lines.slice(1).map((board) =>
    board
      .trim()
      .split("\n")
      .map((line) =>
        line
          .trim()
          .split(/\ +/)
          .map((n) => ({ item: +n, mark: 0 }))
      )
  );
  return [drawOrder, boards];
};

const mark = (num: number, board: Entry[][]) => {
  for (const row of board) {
    const index = row.findIndex((e) => e.item === num);
    if (index !== -1) row[index].mark = 1;
  }
};

const bingo = (board: Entry[][]): boolean => {
  const checkRows = (board: Entry[][]) => _.some(board, (row) => _.every(row, (n) => n.mark));
  return checkRows(board) || checkRows(transpose2DMatrix(board));
};

const sumUnmarked = (board: Entry[][]): number =>
  _.sumBy(
    board.flat(1).filter((n) => n.mark === 0),
    "item"
  );

const getWinningScore = (drawOrder: number[], boards: Entry[][][], mode: "first" | "last"): number => {
  const winBoards: number[] = new Array(boards.length).fill(0);
  for (const num of drawOrder) {
    for (const [i, board] of boards.entries()) {
      mark(num, board);
      const [win, score] = [bingo(board), num * sumUnmarked(board)];
      if (win) winBoards[i] = 1;
      if ((mode === "first" && win) || (mode === "last" && _.every(winBoards))) return score;
    }
  }
  return -1;
};

if (require.main === module) main();
