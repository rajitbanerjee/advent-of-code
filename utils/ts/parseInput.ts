import { readFileSync } from "fs";

export function readAllLines(inFile: string, separator = "\n"): string[] {
  return readFileSync(inFile, "utf-8")
    .split(separator)
    .map((s) => s.replace(/\r$/, ""))
    .filter((s) => s.length > 0);
}

export function readAllLinesAsNumbers(inFile: string): number[] {
  return readAllLines(inFile).map(Number);
}

export function splitAllLinesBy(inFile: string, separator: string): string[][] {
  return readAllLines(inFile).map((l) => l.split(separator));
}

export function splitAllLinesAsNumberBy(inFile: string, separator: string): number[][] {
  return readAllLines(inFile).map((l) => l.split(separator).map(Number));
}
