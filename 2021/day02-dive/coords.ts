#!/usr/bin/env ts-node
import * as utils from "@utils";

const main = () => {
  const parseStep = (step: string[]): [string, number] => [step[0], parseInt(step[1], 10)];
  const plan: [string, number][] = utils.splitAllLinesBy("day02.in", " ").map(parseStep);
  console.log(`Part 1: ${followSteps(plan)}`);
  console.log(`Part 2: ${followSteps(plan, true)}`);
};

const followSteps = (plan: [string, number][], withAim = false, pos = { hor: 0, dep: 0, aim: 0 }): number => {
  plan.forEach(([dir, val]) => move(dir, val, pos, withAim));
  return pos.hor * pos.dep;
};

type Coord = { hor: number; dep: number; aim: number };
const move = (dir: string, val: number, pos: Coord, withAim: boolean) => {
  if (!withAim) {
    pos.hor += dir === "forward" ? val : 0;
    pos.dep += dir === "down" ? val : dir === "up" ? -val : 0;
  } else {
    pos.aim += dir === "down" ? val : dir === "up" ? -val : 0;
    if (dir === "forward") {
      pos.hor += val;
      pos.dep += pos.aim * val;
    }
  }
};

if (require.main === module) main();
