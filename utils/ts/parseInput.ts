import { readFileSync } from "fs";

export const readAllLines = (inFile: string, separator = "\n"): string[] => {
  return readFileSync(inFile, "utf-8")
    .split(separator)
    .map((s) => s.replace(/\r$/, ""))
    .filter((s) => s.length > 0);
};

export const readAllLinesAsNumbers = (inFile: string): number[] => readAllLines(inFile).map(Number);

export const splitAllLinesBy = (inFile: string, separator: string): string[][] => {
  return readAllLines(inFile).map((l) => l.split(separator));
};

export const splitAllLinesAsNumberBy = (inFile: string, separator: string): number[][] => {
  return readAllLines(inFile).map((l) => l.split(separator).map(Number));
};
