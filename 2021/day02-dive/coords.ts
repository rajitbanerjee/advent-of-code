#!/usr/bin/env ts-node
import * as utils from "@utils";

const main = async () => {
  const plan: string[][] = utils.splitAllLinesBy("day02.in", " ");
  console.log(`Part 1: ${await getFinalPosProd(plan)}`);
  console.log(`Part 2: ${await getFinalPosProd(plan, true)}`);
};

const getFinalPosProd = async (plan: string[][], withAim: boolean = false): Promise<number> => {
  const prod = (pos: number[]) => pos.reduce((a, b) => a * b, 1);
  return withAim ? prod(followStepsWithAim(plan)) : prod(await followSteps(plan));
};

const followSteps = async (plan: string[][], pos = [0, 0]): Promise<number[]> => {
  const go = async (step: string[], pos: number[]) => {
    const [dir, val] = parseStep(step);
    pos[0] += dir === "forward" ? val : 0;
    pos[1] += dir === "up" ? -val : dir === "down" ? val : 0;
  };

  await Promise.all(plan.map((step) => go(step, pos)));
  return pos;
};

const parseStep = (step: string[]): [string, number] => [step[0], parseInt(step[1], 10)];

const followStepsWithAim = (plan: string[][], aim = 0, pos = [0, 0]): number[] => {
  const addVectors = (a: number[], b: number[]) => a.forEach((e, i) => (a[i] = e + b[i]));
  plan.forEach((step) => {
    const [dir, val] = parseStep(step);
    aim += dir === "up" ? -val : dir === "down" ? val : 0;
    if (dir === "forward") addVectors(pos, [val, aim * val]);
  });
  return pos;
};

if (require.main === module) main();
