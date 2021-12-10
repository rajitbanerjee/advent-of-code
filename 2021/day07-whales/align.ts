#!/usr/bin/env ts-node
import { median, splitAllLinesAsNumberBy, triangularNum } from "@utils";
import * as _ from "lodash";

const main = () => {
  const positions: number[] = splitAllLinesAsNumberBy("day07.in", ",")[0];
  console.log(`Part 1: ${minFuelToAlign(positions)}`);
  console.log(`Part 2: ${minFuelToAlign(positions, true)}`);
};

const minFuelToAlign = (positions: number[], increasingStepCosts?: boolean) => {
  const mid = increasingStepCosts ? Math.floor(_.mean(positions)) : median(positions);
  const func = increasingStepCosts ? triangularNum : _.identity;
  return _.sumBy(positions, (p) => func(Math.abs(p - mid)));
};

if (require.main === module) main();
