import * as _ from "lodash";

export const sortNums = (nums: number[], ascending = true): number[] => nums.sort((a, b) => +ascending * (a - b));
export const modifyInPlace = (oldArr: any[], newArr: any[]) => newArr.forEach((n, i) => (oldArr[i] = n));
export const cartesianProduct = (...a: any[]): any[][] =>
  a.reduce((a, b) => a.flatMap((d: any) => b.map((e: any) => [d, e].flat())));
export const repeat = (a: any, times: number): any[] => _.range(times).map(() => a);
