#!/usr/bin/env ts-node

import { readFileSync } from "fs";

const main = () => {
  const nums: number[] = readFileSync("day01.in", "utf-8")
    .trim()
    .split("\n")
    .map((line) => parseInt(line, 10));
  console.log(`Part 1: ${countIncreases(nums)}`);
  console.log(`Part 2: ${countIncreasesWindow(nums)}`);
};

const countIncreases = (nums: number[]) =>
  nums.reduce((count, _, i) => count + (i > 0 ? +(nums[i] > nums[i - 1]) : 0)) -
  nums[0];

const countIncreasesWindow = (nums: number[], size = 3) => {
  let left = 0,
    right = size - 1;
  let total = nums.slice(left, right + 1).reduce((a, b) => a + b, 0);
  const window_totals = [total];

  for (let i = right + 1; i < nums.length; i++) {
    total = total + nums[i] - nums[i - size];
    window_totals.push(total);
  }

  return countIncreases(window_totals);
};

if (require.main === module) main();
