#!/usr/bin/env ts-node
import { readAllLines, modifyInPlace } from "@utils";
import * as _ from "lodash";

type NestedArray = Array<NestedElement>;
type NestedElement = number | NestedArray;

const main = () => {
    const nums: NestedArray = readAllLines("day18.in", "\n").map((l) => JSON.parse(l));
    const [a, b] = ["Part 1", "Part 2"];
    console.time(a);
    console.timeLog(a, finalSumMagnitude(_.cloneDeep(nums)));
    console.time(b);
    console.timeLog(b, largestMagnitude(nums));
};

// Part 1
const finalSumMagnitude = (nums: NestedArray): number => {
    const assignmentSize = nums.length;
    let result: NestedElement = nums[0];
    for (let i = 1; i < assignmentSize; i++) result = add(result, nums[i]);
    return magnitude(result);
};

// Part 2
const largestMagnitude = (nums: NestedArray): number => {
    const magnitudes: number[] = [];
    nums.forEach((a, i) => {
        nums.forEach((b, j) => {
            if (i !== j) magnitudes.push(finalSumMagnitude([_.cloneDeep(a), _.cloneDeep(b)]));
        });
    });
    return _.max(magnitudes);
};

const magnitude = (sum: NestedElement): number => {
    if (typeof sum === "number") return sum;
    return 3 * magnitude(sum[0]) + 2 * magnitude(sum[1]);
};

let splitComplete = false;
const add = (a: NestedElement, b: NestedElement): NestedArray => {
    let arr: NestedArray = _.concat([a], [b]);
    while (true) {
        // reduction rules
        if (canExplode(arr)) explode(arr);
        else if (canSplit(arr)) split(arr);
        else break;

        // reset split flag
        splitComplete = false;
    }
    return arr;
};

const canExplode = (arr: NestedArray): boolean => getDepth(arr) >= 5;
const canSplit = (arr: NestedArray): boolean => _.flattenDeep(arr).filter((n) => n > 9).length !== 0;
const getDepth = (arr: any[]) => (Array.isArray(arr) ? 1 + Math.max(...arr.map(getDepth)) : 0);

const explode = (arr: NestedArray, depth = 4): void => {
    const explodingPair: [number, number] = [-1, -1];
    identifyExplodingPair(arr, depth, explodingPair);

    let [stringArr, res] = [JSON.stringify(arr), ""];
    const nums = stringArr.match(/-?\d+/g).map(Number);
    const explodingIndex = nums.findIndex((n) => n < 0);

    // Increase regular numbers to the left and right
    if (explodingIndex - 1 >= 0) nums[explodingIndex - 1] += explodingPair[0];
    if (explodingIndex + 1 < nums.length) nums[explodingIndex + 1] += explodingPair[1];

    // Reconstruction after updating numbers to left and right of exploding pair
    stringArr = stringArr.replace("-1", "X");
    nums.filter((n) => n >= 0).forEach((n) => {
        let [start, end] = findNumberIndices(stringArr);
        res += stringArr.slice(0, start) + n;
        stringArr = stringArr.slice(end);
    });

    modifyInPlace(arr, JSON.parse((res + stringArr).replace("X", "0")));
};

// Store exploding pair and replace it with -1
const identifyExplodingPair = (arr: NestedElement, depth: number, explodingPair: [number, number]): void => {
    if (!Array.isArray(arr)) return;
    for (const [i, val] of arr.entries()) {
        if (typeof val === "number" || getDepth(val) !== depth) continue;
        if (depth > 1) identifyExplodingPair(val, depth - 1, explodingPair);
        if (explodingPair.includes(-1)) {
            explodingPair[0] = arr[i][0];
            explodingPair[1] = arr[i][1];
            arr[i] = -1;
        }
    }
};

const findNumberIndices = (s: string): [number, number] => {
    const start = /\d+/.exec(s).index;
    let end = start;
    while (Number.isInteger(+s[end])) end++;
    return [start, end];
};

const split = (arr: NestedElement): void => {
    if (!Array.isArray(arr)) return;
    for (const [i, val] of arr.entries()) {
        if (typeof val === "number" && val > 9 && !splitComplete) {
            arr[i] = [Math.floor(val / 2), Math.ceil(val / 2)];
            splitComplete = true;
        } else {
            split(val);
        }
    }
};

if (require.main === module) main();
