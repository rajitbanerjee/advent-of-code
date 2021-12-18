#!/usr/bin/env ts-node
import { readAllLines } from "@utils";
import * as _ from "lodash";
import { type } from "os";

type NestedElement = number | NestedArray;
type NestedArray = Array<NestedElement>;

const main = () => {
  const nums: NestedArray = readAllLines("day18.in", "\n").map((l) => JSON.parse(l));
  const [a, b] = ["Part 1", "Part 2"];
  console.time(a);
  console.timeLog(a, finalSumMagnitude(_.cloneDeep(nums)));
};

const finalSumMagnitude = (nums: NestedArray): number => {
  const assignmentSize = nums.length;
  let result: NestedElement = nums[0];
  for (let i = 1; i < assignmentSize; i++) {
    console.log(JSON.stringify(result));
    result = add(result, nums[i]);
  }
  console.log(JSON.stringify(result));
  return magnitude(result);
};

const magnitude = (sum: NestedElement): number => {
  if (typeof sum === "number") return sum;
  return 3 * magnitude(sum[0]) + 2 * magnitude(sum[1]);
};

let splitComplete = false;
const add = (a: NestedElement, b: NestedElement): NestedArray => {
  let arr: NestedArray = _.concat([a], [b]);
  while (true) {
    if (canExplode(arr)) arr = explode(arr);
    else if (canSplit(arr)) {
      splitComplete = false;
      split(arr);
    } else break;
  }
  return arr;
};

const canExplode = (arr: NestedArray): boolean => getDepth(arr) >= 5;

const getDepth = (arr: any[]) => (Array.isArray(arr) ? 1 + Math.max(...arr.map(getDepth)) : 0);

const explode = (arr: NestedArray): NestedArray => {
  let explodingPair = null;
  const identifyExplodingPair = (arr: NestedElement, depth = 4): void => {
    if (!Array.isArray(arr)) return;
    for (const [i, val] of arr.entries()) {
      if (typeof val !== "number" && getDepth(val) === depth) {
        if (depth === 1 && explodingPair === null) {
          explodingPair = arr[i];
          arr[i] = -1;
          return;
        }
        identifyExplodingPair(arr[i], depth - 1);
      }
    }
  };
  let stringArr = JSON.stringify(arr);

  identifyExplodingPair(arr);

  stringArr = JSON.stringify(arr);
  const nums = stringArr.match(/-?\d+/g).map(Number);

  const idx = nums.findIndex((n) => n < 0);

  if (idx - 1 >= 0) nums[idx - 1] += explodingPair[0];
  if (idx + 1 < nums.length) nums[idx + 1] += explodingPair[1];

  let res = "";
  _.remove(nums, (n) => n < 0);

  stringArr = stringArr.replace("-1", "X");
  for (let i = 0; i < nums.length; i++) {
    let [start, end] = findNumber(stringArr);
    res += stringArr.slice(0, start) + nums[i];
    stringArr = stringArr.slice(end);
  }
  res += stringArr;
  res = res.replace("X", "0");

  return JSON.parse(res);
};

const findNumber = (s: string): [number, number] => {
  const start = /\d+/.exec(s).index;
  let end = start;
  while (Number.isInteger(+s[end])) end++;
  return [start, end];
};

const canSplit = (arr: NestedArray): boolean => _.flattenDeep(arr).filter((n) => n > 9).length !== 0;

const split = (arr: NestedElement): void => {
  if (!Array.isArray(arr)) return;
  for (const [i, val] of arr.entries()) {
    if (typeof val === "number" && val > 9 && !splitComplete) {
      arr[i] = [Math.floor(val / 2), Math.ceil(val / 2)];
      splitComplete = true;
      return;
    } else {
      split(val);
    }
  }
};

if (require.main === module) main();
