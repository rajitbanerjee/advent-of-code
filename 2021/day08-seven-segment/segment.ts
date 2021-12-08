#!/usr/bin/env ts-node
import { splitAllLinesBy, sum } from "@utils";

type Entry = { input: string[]; output: string[] };
const main = () => {
  const entries: Entry[] = parseInput("day08.in");
  console.log(`Part 1: ${countEasyOutputDigits(entries)}`);
  console.log(`Part 2: ${totalOutput(entries)}`);
};

const parseInput = (inFile: string): Entry[] => {
  const sort = (e: string) => {
    const a = e.split("");
    a.sort();
    return a.join("");
  };
  return splitAllLinesBy(inFile, "|").map((line) => ({
    input: line[0].trim().split(" ").map(sort),
    output: line[1].trim().split(" ").map(sort),
  }));
};

const countEasyOutputDigits = (entries: Entry[]) =>
  sum(entries.map((e) => e.output.filter((val) => [2, 4, 3, 7].includes(val.length)).length));

const totalOutput = (entries: Entry[]) => {
  return sum(
    entries.map((e) => {
      const revPatterns: Map<string, number> = decode(e.input);
      return +(e.output, e.output.map((num) => revPatterns.get(num)).join(""));
    })
  );
};

const decode = (input: string[]): Map<string, number> => {
  const patterns = new Map<number, string>();
  const segment: string[] = new Array(7).fill(" ");
  const len5: string[] = [];
  const len6: string[] = [];
  input.forEach((i) => {
    if (i.length === 2) {
      patterns.set(1, i);
    } else if (i.length === 3) {
      patterns.set(7, i);
    } else if (i.length === 4) {
      patterns.set(4, i);
    } else if (i.length === 7) {
      patterns.set(8, i);
    } else if (i.length === 5) {
      len5.push(i);
    } else if (i.length === 6) {
      len6.push(i);
    }
  });

  segment[0] = diff(patterns.get(7), patterns.get(1));
  segment[2] = patterns.get(1);
  segment[5] = segment[2];
  segment[1] = diff(patterns.get(4), patterns.get(1));
  segment[3] = segment[1];

  segment[3] = common(common(len5[0], len5[1]), len5[2]).replace(segment[0], "");
  segment[6] = segment[3];
  segment[1] = segment[1].replace(common(segment[1], segment[3]), "");
  patterns.set(
    5,
    len5.find((e) => e.includes(segment[1]))
  );

  segment[2] = symmetricDiff(segment[2], patterns.get(5));
  segment[5] = diff(segment[5], segment[2]);

  patterns.set(
    3,
    len5.find((e) => e.includes(segment[5]) && e !== patterns.get(5))
  );
  patterns.set(
    2,
    len5.find((e) => !e.includes(segment[5]))
  );
  patterns.set(
    6,
    len6.find((e) => !e.includes(segment[2]))
  );

  segment[4] = diff(
    "abcdefg"
      .split("")
      .filter((x) => !segment.includes(x))
      .join(""),
    segment[3]
  );
  patterns.set(
    0,
    len6.find((e) => e.includes(segment[4]) && e !== patterns.get(6))
  );
  patterns.set(
    9,
    len6.find((e) => !e.includes(segment[4]) && e !== patterns.get(6))
  );

  const revPatterns = new Map<string, number>();
  for (const [k, v] of patterns) revPatterns.set(v, k);
  return revPatterns;
};

const diff = (s1: string, s2: string): string => {
  const a = s1.length > s2.length ? s1 : s2;
  const b = s1 === a ? s2 : s1;
  return a
    .split("")
    .filter((x) => !b.split("").includes(x))
    .join("");
};

const symmetricDiff = (s1: string, s2: string): string => {
  return s1
    .split("")
    .filter((x) => !s2.split("").includes(x))
    .join("");
};

const common = (s1: string, s2: string): string => {
  return s1
    .split("")
    .filter((x) => s2.split("").includes(x))
    .join("");
};

if (require.main === module) main();
