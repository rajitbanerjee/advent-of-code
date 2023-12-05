import * as _ from "lodash";

export function vectorSum(a: number[], b: number[]) {
  return a.forEach((e, i) => (a[i] = e + b[i]));
}

export function triangularNum(k: number) {
  return (k * (k + 1)) / 2;
}

export function prod(nums: number[]) {
  return nums.reduce((a, b) => a * b, 1);
}

// Binary
export function bin2dec(num: string) {
  return parseInt(num, 2);
}

export function flipBits(bits: string) {
  return bits
    .split("")
    .map((b) => (1 - +b).toString())
    .join("");
}

export function hex2bin(hex: string): string {
  return hex
    .split("")
    .map((d) => parseInt(d, 16).toString(2).padStart(4, "0"))
    .join("");
}
