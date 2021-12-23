#!/usr/bin/env ts-node
import { cartesianProduct, repeat, splitAllLinesAsNumberBy, vectorSum } from "@utils";
import * as _ from "lodash";

class Player {
  space: number;
  score: number;
  constructor(space: number, score: number) {
    this.space = space;
    this.score = score;
  }
  toString(): string {
    return this.space + "," + this.score;
  }
}

const main = () => {
  const startPos = splitAllLinesAsNumberBy("day21.in", ": ").map((p) => p[1]);
  const players = [new Player(startPos[0], 0), new Player(startPos[1], 0)];

  const [a, b] = ["Part 1", "Part 2"];
  console.time(a);
  console.timeLog(a, getLosingNumber(_.cloneDeep(players), 1000));
  console.time(b);
  console.timeLog(b, countWinningUniverses(players, 21));
};

// Part 1
const getLosingNumber = (players: Player[], winScore: number): number => {
  const gameOver = () => _.some(players, (p) => p.score >= winScore);
  let die = 0;
  for (let i = 0; !gameOver(); die += 3, i = (i + 1) % 2) {
    players[i] = move(players[i], _.sum(_.range(die + 1, die + 4)));
  }
  return die * _.minBy(players, "score").score;
};

const move = (player: Player, dieSum: number): Player => {
  const space = ((player.space + dieSum - 1) % 10) + 1;
  return new Player(space, player.score + space);
};

// Part 2
const memo: { [key: string]: number[] } = {};
const countWinningUniverses = (players: Player[], winScore: number): number => {
  const wins = playRealGame(players[0], players[1], winScore);
  return _.max(wins);
};

const playRealGame = (player1: Player, player2: Player, winScore: number): number[] => {
  if (player1.score >= winScore) return [1, 0];
  if (player2.score >= winScore) return [0, 1];

  const state = hash(player1, player2);
  if (state in memo) return memo[state];

  let result = [0, 0];
  let sides = [1, 2, 3];

  // Brute force + memoization
  for (const dieSum of cartesianProduct(...repeat(sides, 3)).map(_.sum)) {
    const [p2Wins, p1Wins] = playRealGame(player2, move(player1, dieSum), winScore);
    vectorSum(result, [p1Wins, p2Wins]);
  }

  memo[state] = result;
  return result;
};

const hash = (...players: Player[]): string => players.map((p) => p.toString()).join(",");

if (require.main === module) main();
