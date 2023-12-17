#!/usr/bin/env ts-node

import { readAllLines } from "@utils";
import * as _ from "lodash";

type Result = { hmax: number; distinct: number };
type Probe = { x: number; y: number; h: number };
type Target = { x1: number; x2: number; y1: number; y2: number };

const main = () => {
    const nums: number[] = readAllLines("day17.in", "\n")[0].match(/-?\d+/g).map(Number);
    const target: Target = { x1: nums[0], x2: nums[1], y1: nums[2], y2: nums[3] };

    console.time("Time");
    const res: Result = simulateTrajectories(target); // brute force :)
    console.timeLog("Time");

    console.log(`Part 1: ${res.hmax}`);
    console.log(`Part 2: ${res.distinct}`);
};

const simulateTrajectories = (target: Target): Result => {
    const { x1, x2, y1, y2 } = target;
    const res: Result = { hmax: 0, distinct: 0 };
    _.range(x2 + 1).forEach((x) => _.range(y1, -y1).forEach((y) => launch(x, y, target, res)));
    return res;
};

const launch = (x: number, y: number, target: Target, res: Result) => {
    const probe: Probe = { x: 0, y: 0, h: 0 };
    let t = 0;
    do {
        probe.x += Math.max(x - t, 0); // increase velocity; deal with drag
        probe.y += y - t; // increase velocity; deal with gravity
        probe.h = Math.max(probe.h, probe.y);
        if (isProbeInTarget(probe, target)) {
            res.hmax = Math.max(probe.h, res.hmax);
            res.distinct++;
            break;
        }
    } while (t++ < 250); // trial and error
};

const isProbeInTarget = (probe: Probe, target: Target) =>
    _.inRange(probe.x, target.x1, target.x2 + 1) && _.inRange(probe.y, target.y1, target.y2 + 1);

if (require.main === module) main();
