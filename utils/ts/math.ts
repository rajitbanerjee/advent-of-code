export const vectorSum = (a: number[], b: number[]) => a.forEach((e, i) => (a[i] = e + b[i]));
export const triangularNum = (k: number) => (k * (k + 1)) / 2;
export const prod = (nums: number[]) => nums.reduce((a, b) => a * b, 1);

// Binary
export const bin = (num: string) => parseInt(num, 2);
export const flipBits = (bits: string) =>
  bits
    .split("")
    .map((b) => (1 - +b).toString())
    .join("");
