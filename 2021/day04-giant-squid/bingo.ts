#!/usr/bin/env ts-node
import { sum, transpose2DMatrix } from "@utils";
import { readFileSync } from "fs";

const main = () => {
  const [drawOrder, boards1] = parseInput("day04.in");
  const boards2 = JSON.parse(JSON.stringify(boards1)); // deep copy
  console.log(`Part 1: ${getWinningScore(drawOrder, boards1, "first")}`);
  console.log(`Part 2: ${getWinningScore(drawOrder, boards2, "last")}`);
};

type Entry = { item: number; mark: number };
const parseInput = (inFile: string): [number[], Entry[][][]] => {
  const lines = readFileSync(inFile, "utf-8").split("\n\n");
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

const bingo = (board: Entry[][], boardSize = 5): boolean => {
  const checkRows = (board: Entry[][]): boolean => {
    for (const row of board) {
      if (sum(row.map((n) => n.mark)) === boardSize) return true;
    }
    return false;
  };
  return checkRows(board) || checkRows(transpose2DMatrix(board));
};

const sumUnmarked = (board: Entry[][]): number => {
  return sum(
    board
      .flat(1)
      .filter((n) => n.mark === 0)
      .map((n) => n.item)
  );
};

const getWinningScore = (drawOrder: number[], boards: Entry[][][], mode: "first" | "last"): number => {
  const winBoards: number[] = new Array(boards.length).fill(0);
  for (const num of drawOrder) {
    let i = 0;
    for (const board of boards) {
      mark(num, board);
      const win = bingo(board);
      const score = num * sumUnmarked(board);
      switch (mode) {
        case "first":
          if (win) return score;
        case "last":
          if (win) winBoards[i] = 1;
          if (sum(winBoards) === winBoards.length) return score;
      }
      i++;
    }
  }
  return -1;
};

if (require.main === module) main();
