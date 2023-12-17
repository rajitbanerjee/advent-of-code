#!/usr/bin/env ts-node
import { createMatrix, splitAllLinesBy } from "@utils";
import * as _ from "lodash";

const main = () => {
    const vents: number[][][] = splitAllLinesBy("day05.in", "->").map((line) => line.map((arr) => arr.split(",").map(Number)));
    console.log(`Part 1: ${getOverlap(_.cloneDeep(vents))}`);
    console.log(`Part 2: ${getOverlap(vents, true)}`);
};

const getOverlap = (vents: number[][][], diagonals = false) => {
    const ocean: number[][] = drawAllLines(vents, diagonals);
    // console.log(ocean.map((l) => l.join(" ")));
    return countOverlappingPoints(ocean);
};

const drawAllLines = (vents: number[][][], diagonals: boolean): number[][] => {
    const size = Math.max(...vents.flat(2)) + 1;
    const ocean: number[][] = createMatrix(0, size);
    vents.forEach((vent) => drawSegment(vent, ocean, diagonals));
    return ocean;
};

const drawSegment = (vent: number[][], ocean: number[][], diagonals: boolean) => {
    const [[b1, a1], [b2, a2]] = vent;
    let x = [a1, a2];
    let y = [b1, b2];
    // Ensure that diagonal lines are always facing down
    if (a1 > a2 || (a1 === a2 && b1 > b2)) {
        x = x.reverse();
        y = y.reverse();
    }

    const horizontalOrVertical = x[0] === x[1] || y[0] === y[1];
    if (horizontalOrVertical) {
        _.range(x[0], x[1] + 1).forEach((i) => _.range(y[0], y[1] + 1).forEach((j) => ocean[i][j]++));
    } else if (diagonals) {
        const direction = y[0] < y[1] ? 1 : -1;
        let [i, j] = [x[0], y[0]];
        while (i <= x[1]) {
            ocean[i++][j]++;
            j += direction;
        }
    }
};

const countOverlappingPoints = (ocean: number[][]): number => {
    return _.sumBy(ocean, (row) => row.filter((e) => e >= 2).length);
};

if (require.main === module) main();
