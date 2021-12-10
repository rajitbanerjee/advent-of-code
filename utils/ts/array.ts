export const sortNums = (nums: number[], ascending = true): number[] => nums.sort((a, b) => +ascending * (a - b));
