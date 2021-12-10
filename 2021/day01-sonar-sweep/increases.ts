#!/usr/bin/env ts-node
import { readAllLinesAsNumbers } from "@utils";
import * as _ from "lodash";

const main = () => {
  const nums: number[] = readAllLinesAsNumbers("day01.in");
  console.log(`Part 1: ${countIncreases(nums)}`);
  console.log(`Part 2: ${countIncreasesWindow(nums, 3)}`);
};

const countIncreases = (nums: number[]) => 1 + _.sumBy(_.tail(nums).map((_, i) => nums[i] > nums[i - 1]));
const countIncreasesWindow = (nums: number[], size: number) => {
  const totals = [_.sum(_.take(nums, size))];
  _.range(size, nums.length).forEach((i) => totals.push(totals[i - size] + nums[i] - nums[i - size]));
  return countIncreases(totals);
};

if (require.main === module) main();
