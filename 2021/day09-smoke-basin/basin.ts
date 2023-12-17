#!/usr/bin/env ts-node
import { prod, sortNums, splitAllLinesAsNumberBy } from "@utils";
import * as _ from "lodash";

const main = () => {
    const heightmap: number[][] = splitAllLinesAsNumberBy("day09.in", "");
    console.log(`Part 1: ${sumLowRiskLevels(heightmap)}`);
    console.log(`Part 2: ${prodThreeLargestBasins(heightmap)}`);
};

// Part 1
const sumLowRiskLevels = (heightmap: number[][]): number =>
    _.sum(heightmap.flatMap((row, i) => row.map((h, j) => (isLowPoint(heightmap, i, j) ? h + 1 : 0))));

type Point = { i: number; j: number; v?: number };
const lowPoints: Point[] = [];

const isLowPoint = (heightmap: number[][], i: number, j: number): boolean => {
    const point = { i, j, v: heightmap[i][j] };
    const isLow = _.every(getAdjacentPoints(heightmap, point), (p) => point.v < p.v);
    if (isLow) lowPoints.push(point);
    return isLow;
};

const getAdjacentPoints = (heightmap: number[][], point: Point): Point[] => {
    return [
        { i: point.i + 1, j: point.j },
        { i: point.i - 1, j: point.j },
        { i: point.i, j: point.j + 1 },
        { i: point.i, j: point.j - 1 },
    ]
        .filter((p) => isValid(p, heightmap.length, heightmap[0].length))
        .map((p) => ({ ...p, v: heightmap[p.i][p.j] }));
};

const isValid = (point: Point, numRows: number, numCols: number): boolean => _.inRange(point.i, numRows) && _.inRange(point.j, numCols);

// Part 2
const prodThreeLargestBasins = (heightmap: number[][]): number => {
    const seen = new Set<string>();
    return prod(sortNums(lowPoints.map((p) => basinSize(heightmap, p, seen))).slice(-3));
};

const basinSize = (heightmap: number[][], point: Point, seen: Set<string>): number => {
    const key = point.i + "," + point.j;
    if (point.v === 9 || seen.has(key)) return 0;
    seen.add(key);
    return 1 + _.sumBy(getAdjacentPoints(heightmap, point), (p) => basinSize(heightmap, p, seen));
};

if (require.main === module) main();
