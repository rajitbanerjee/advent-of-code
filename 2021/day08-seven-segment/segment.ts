#!/usr/bin/env ts-node
import { sortString, splitAllLinesBy } from "@utils";
import * as _ from "lodash";

type Entry = { input: string[]; output: string[] };
const main = () => {
  const entries: Entry[] = splitAllLinesBy("day08.in", "|").map((line) => ({
    input: line[0].trim().split(" ").map(sortString),
    output: line[1].trim().split(" ").map(sortString),
  }));
  console.log(`Part 1: ${countEasyOutputDigits(entries)}`);
  console.log(`Part 2: ${totalOutput(entries)}`);
};

const countEasyOutputDigits = (entries: Entry[]): number =>
  _.sumBy(entries, (e) => e.output.filter((val) => [2, 4, 3, 7].includes(val.length)).length);

const totalOutput = (entries: Entry[]): number => _.sumBy(entries, (e) => +e.output.map(decode(e.input)).join(""));

const decode = (input: string[]): ((digit: string) => string) => {
  const patterns: { [key: string]: string } = {};
  const segment: string[] = new Array(7).fill(" ");
  const len = { 5: [], 6: [] };

  input.forEach((i) => {
    if (i.length === 2) patterns[1] = i;
    else if (i.length === 3) patterns[7] = i;
    else if (i.length === 4) patterns[4] = i;
    else if (i.length === 7) patterns[8] = i;
    else if (i.length === 5) len[5].push(i);
    else if (i.length === 6) len[6].push(i);
  });
  // 6 patterns to go

  segment[0] = diff(patterns[7], patterns[1]);
  segment[1] = diff(patterns[4], patterns[1]);
  segment[3] = common(common(len[5][0], len[5][1]), len[5][2]).replace(segment[0], "");
  segment[6] = segment[3];
  segment[1] = segment[1].replace(common(segment[1], segment[3]), "");
  patterns[5] = _.remove(len[5], (e) => e.includes(segment[1]))[0]; // 5 patterns to go
  segment[2] = diff(patterns[1], patterns[5]);
  segment[5] = diff(patterns[1], segment[2]);
  patterns[3] = _.remove(len[5], (e) => e.includes(segment[5]))[0]; // 4 patterns to go
  patterns[2] = len[5][0]; // 3 patterns to go
  patterns[6] = _.remove(len[6], (e) => !e.includes(segment[2]))[0]; // 2 patterns to go

  const remaining = ["a", "b", "c", "d", "e", "f", "g"].filter((x) => !segment.includes(x)).join("");
  segment[4] = diff(remaining, segment[3]);

  patterns[0] = _.remove(len[6], (e) => e.includes(segment[4]))[0]; // 1 pattern to go
  patterns[9] = len[6][0]; // all patterns decoded!

  return (digit: string) => _.invert(patterns)[digit];
};

const diff = (s1: string, s2: string) => _.difference(s1.split(""), s2.split("")).join("");
const common = (s1: string, s2: string) => _.intersection(s1.split(""), s2.split("")).join("");

if (require.main === module) main();
