#!/usr/bin/env ts-node
import { mean, median, splitAllLinesAsNumberBy, sum, triangularNum } from "@utils";

const main = () => {
  const positions: number[] = splitAllLinesAsNumberBy("day07.in", ",")[0];
  console.log(`Part 1: ${minFuelToAlign(positions)}`);
  console.log(`Part 2: ${minFuelToAlign(positions, true)}`);
};

const minFuelToAlign = (positions: number[], increasingStepCosts?: boolean) => {
  if (!increasingStepCosts) {
    const m = median(positions);
    return sum(positions.map((p) => Math.abs(p - m)));
  } else {
    // The mean now becomes the best horizontal position to min. differences
    const m = Math.floor(mean(positions));
    // 1, 1+2, 1+2+3, ...
    return sum(positions.map((p) => triangularNum(Math.abs(p - m))));
  }
};

if (require.main === module) main();
