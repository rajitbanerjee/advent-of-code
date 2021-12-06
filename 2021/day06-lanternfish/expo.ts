#!/usr/bin/env ts-node

import { splitAllLinesAsNumberBy, sum } from "@utils";

const main = () => {
  const initialState: number[] = splitAllLinesAsNumberBy("day06.in", ",")[0];
  console.log(`Part 1: ${countLanternfish(initialState, 80)}`);
  console.log(`Part 2: ${countLanternfish(initialState, 256)}`);
};

const countLanternfish = (initialState: number[], days: number, rate = 7) => {
  // group fish by number of days left to double
  const numFish: number[] = new Array(rate + 2).fill(0);
  initialState.forEach((n) => numFish[n]++);
  while (days-- > 0) {
    const fishToDouble = numFish[0];
    numFish.slice(0, -1).forEach((_, i) => (numFish[i] = numFish[i + 1])); // new day
    numFish[rate - 1] += fishToDouble; // reset internal timer
    numFish[rate + 1] = fishToDouble; // new fish
  }
  return sum(numFish);
};

if (require.main === module) main();
