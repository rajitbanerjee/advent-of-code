import { sum } from "./math";

// 1-D
export const mean = (nums: number[]) => {
  return sum(nums) / nums.length;
};
export const median = (nums: number[]) => {
  const sorted: number[] = nums.slice().sort((a, b) => a - b);
  const middle: number = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) return (sorted[middle - 1] + sorted[middle]) / 2;
  return sorted[middle];
};
export const triangularNum = (k: number) => (k * (k + 1)) / 2;

// matrix
export const transpose2DMatrix = (m: any[][]) => m[0].map((_, i) => m.map((x) => x[i]));
export const createNumberMatrix = (size: number) => [...Array(size)].map((_) => Array(size).fill(0));
