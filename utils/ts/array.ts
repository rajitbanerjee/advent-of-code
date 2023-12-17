import * as _ from "lodash";

export function sortNums(nums: number[], ascending = true): number[] {
    return nums.sort((a, b) => +ascending * (a - b));
}

export function modifyInPlace(oldArr: any[], newArr: any[]) {
    return newArr.forEach((n, i) => (oldArr[i] = n));
}

export function cartesianProduct(...a: any[]): any[][] {
    return a.reduce((a, b) => a.flatMap((d: any) => b.map((e: any) => [d, e].flat())));
}

export function repeat(a: any, times: number): any[] {
    return _.range(times).map(() => a);
}
