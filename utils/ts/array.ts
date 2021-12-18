export const sortNums = (nums: number[], ascending = true): number[] => nums.sort((a, b) => +ascending * (a - b));
export const modifyInPlace = (oldArr: any[], newArr: any[]) => newArr.forEach((n, i) => (oldArr[i] = n));
