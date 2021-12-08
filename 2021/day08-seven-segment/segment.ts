#!/usr/bin/env ts-node
import { difference, intersection, sortString, splitAllLinesBy, sum } from "@utils";

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
  sum(entries.map((e) => e.output.filter((val) => [2, 4, 3, 7].includes(val.length)).length));

const totalOutput = (entries: Entry[]): number => sum(entries.map((e) => +e.output.map(decode(e.input)).join("")));

const decode = (input: string[]): ((digit: string) => number) => {
  const patterns: { [key: string]: string } = {};
  const segment: string[] = new Array(7).fill(" ");
  const len = { 5: [], 6: [] };

  input.forEach((i) => {                          //  0000
    if (i.length === 2) patterns[1] = i;          // 1    2
    else if (i.length === 3) patterns[7] = i;     // 1    2
    else if (i.length === 4) patterns[4] = i;     //  3333
    else if (i.length === 7) patterns[8] = i;     // 4    5
    else if (i.length === 5) len[5].push(i);      // 4    5
    else if (i.length === 6) len[6].push(i);      //  6666
  });
  // 6 patterns to go
  
  segment[0] = diff(patterns[7], patterns[1]);
  segment[1] = diff(patterns[4], patterns[1]);
  segment[3] = common(common(len[5][0], len[5][1]), len[5][2]).replace(segment[0], "");
  segment[6] = segment[3];
  segment[1] = segment[1].replace(common(segment[1], segment[3]), "");
  patterns[5] = len[5].find((e) => e.includes(segment[1])); // 5 patterns to go
  segment[2] = diff(patterns[1], patterns[5]);
  segment[5] = diff(patterns[1], segment[2]);
  patterns[3] = len[5].find((e) => e.includes(segment[5]) && e !== patterns[5]); // 4 patterns to go
  patterns[2] = len[5].find((e) => !e.includes(segment[5])); // 3 patterns to go
  patterns[6] = len[6].find((e) => !e.includes(segment[2])); // 2 patterns to go

  const remaining = ["a", "b", "c", "d", "e", "f", "g"].filter((x) => !segment.includes(x)).join("");
  segment[4] = diff(remaining, segment[3]);

  patterns[0] = len[6].find((e) => e.includes(segment[4]) && e !== patterns[6]); // 1 pattern to go
  patterns[9] = len[6].find((e) => !e.includes(segment[4]) && e !== patterns[6]); // all patterns decoded!

  const codes: { [key: string]: number } = {};
  Object.entries(patterns).forEach(([digit, pattern]) => (codes[pattern] = +digit));
  return (digit: string) => codes[digit];
};

const diff = (s1: string, s2: string) => [...difference(new Set(s1), new Set(s2))].join("");
const common = (s1: string, s2: string) => [...intersection(new Set(s1), new Set(s2))].join("");

if (require.main === module) main();
