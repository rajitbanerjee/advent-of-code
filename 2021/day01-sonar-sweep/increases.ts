#!/usr/bin/env ts-node
import * as utils from "@utils";

const main = () => {
  const nums: number[] = utils.readAllLinesAsNumbers("day01.in");
  console.log(`Part 1: ${countIncreases(nums)}`);
  console.log(`Part 2: ${countIncreasesWindow(nums, 3)}`);
};

const countIncreases = (nums: number[]) =>
  nums.reduce((count, _, i) => count + (i > 0 ? +(nums[i] > nums[i - 1]) : 0)) -
  nums[0];

const countIncreasesWindow = (nums: number[], size: number) => {
  const windowTotals = [utils.sum(nums.slice(0, size))];
  for (let i = size; i < nums.length; i++) {
    windowTotals.push(windowTotals[i - size] + nums[i] - nums[i - size]);
  }
  return countIncreases(windowTotals);
};

if (require.main === module) main();
