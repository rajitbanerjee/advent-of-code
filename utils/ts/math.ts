export const sum = (nums: number[]) => nums.reduce((a, b) => a + b, 0);
export const prod = (nums: number[]) => nums.reduce((a, b) => a * b, 1);
export const vectorSum = (a: number[], b: number[]) => a.forEach((e, i) => (a[i] = e + b[i]));
export const bin = (num: string) => parseInt(num, 2);
export const flipBits = (bits: string) =>
  bits
    .split("")
    .map((b) => (1 - +b).toString())
    .join("");
