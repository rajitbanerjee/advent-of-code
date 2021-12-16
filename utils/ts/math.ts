import * as _ from "lodash";

export const vectorSum = (a: number[], b: number[]) => a.forEach((e, i) => (a[i] = e + b[i]));
export const triangularNum = (k: number) => (k * (k + 1)) / 2;
export const prod = (nums: number[]) => nums.reduce((a, b) => a * b, 1);

// Binary
export const bin2dec = (num: string) => parseInt(num, 2);
export const flipBits = (bits: string) =>
  bits
    .split("")
    .map((b) => (1 - +b).toString())
    .join("");
export const hex2bin = (hex: string): string =>
  hex
    .split("")
    .map((d) => parseInt(d, 16).toString(2).padStart(4, "0"))
    .join("");
